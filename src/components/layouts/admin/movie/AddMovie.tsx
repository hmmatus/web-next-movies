"use client";
import MainButton from "@/components/elements/buttons/MainButton/MainButton";
import InputText from "@/components/elements/form/inputs/InputText/InputText";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { movieSchema } from "./validation";
import InputFile from "@/components/elements/form/inputs/InputFile/InputFile";
import { movieService } from "@/service/movie/movieService";
import { useAppSelector } from "@/redux/hooks";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import InputSelect, { OptionsP } from "@/components/elements/form/inputs/InputSelect/InputSelect";

export type MovieFormI = {
  title: string;
  description: string;
  stock: number;
  rentAmount: number;
  saleAmount: number;
  availability: string;
  image: any;
};

const availabilityOptions: OptionsP[] = [
  {name: "", value: ""},
  {name: "Available", value: "true"},
  {name: "Not Available", value: "false"}
]
const AddMovieLayout = () => {
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(movieSchema),
  });
  const router = useRouter();
  const user = useAppSelector((state) => state.user);
  const {idCinema} = user;
  const onAddMovie = async (data: MovieFormI) => {
    setLoading(true);
    try {
      const imageResult = await movieService.uploadPicture(
        data.image
      );
      await movieService.addMovie(idCinema, {
        ...data,
        image: imageResult.url,
      });
      toast("User has been created successfully");
      router.replace("/admin/home");
    } catch (error) {
      console.log("🚀 ~ onAddMovie ~ error:", error);
    } finally {
      setLoading(false);
    }
  };
  const onSubmit: SubmitHandler<MovieFormI> = (data) => {
    onAddMovie(data);
  };
  return (
    <main>
      <div className="flex items-center justify-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <InputFile
                title="Profile photo"
                name={field.name}
                value={field.value}
                onChange={(value) => field.onChange(value)}
                errorMessage={errors.image?.message}
              />
            )}
          />
          <Controller
            name="title"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <InputText
                title="Title"
                name={field.name}
                value={field.value}
                onChange={(value) => field.onChange(value)}
                errorMessage={errors.title?.message}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <InputText
                title="Description"
                name={field.name}
                value={field.value}
                onChange={(value) => field.onChange(value)}
                errorMessage={errors.description?.message}
              />
            )}
          />
          <Controller
            name="stock"
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <InputText
                title="Initial Stock"
                name={field.name}
                value={field.value}
                onChange={(value) => field.onChange(value)}
                errorMessage={errors.stock?.message}
              />
            )}
          />

          <Controller
            name="saleAmount"
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <InputText
                title="Sale Amount"
                name={field.name}
                value={field.value}
                onChange={(value) => field.onChange(value)}
                errorMessage={errors.saleAmount?.message}
              />
            )}
          />
          <Controller
            name="rentAmount"
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <InputText
                title="Rent Amount"
                name={field.name}
                value={field.value}
                onChange={(value) => field.onChange(value)}
                errorMessage={errors.rentAmount?.message}
              />
            )}
          />

          <Controller
            name="availability"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <InputSelect
                title="Availability"
                name={field.name}
                value={field.value}
                onChange={(value) => field.onChange(value)}
                errorMessage={errors.availability?.message}
                options={availabilityOptions}
              />
            )}
          />

          <MainButton
            className="w-full mt-4"
            type="submit"
            title="Send"
            disabled={loading}
          />
        </form>
      </div>
    </main>
  );
};

export default AddMovieLayout;
