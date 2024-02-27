"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { cinemaSchema } from "./validation";
import InputText from "@/components/elements/form/inputs/InputText/InputText";
import MainButton from "@/components/elements/buttons/MainButton/MainButton";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { cinemaService } from "@/service/cinema/cinemaService";

export type RegisterCinemaP = {
  name: string;
  description: string;
};
const RegisterCinemaLayout = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(cinemaSchema),
  });
  const router = useRouter();

  const onRegister = async (data: RegisterCinemaP) => {
    try {
      await cinemaService.registerCinema(data);
      toast.success("Cinema registered", {
        onClose: () => {
          router.back();
        },
      });
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  const onSubmit: SubmitHandler<RegisterCinemaP> = (data) => {
    onRegister(data);
  };
  return (
    <main className="p-4">
      <div className={`w-full lg:w-w-screen-xl flex flex-col items-center justify-center`}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <InputText
                title="Name"
                name={field.name}
                value={field.value}
                onChange={(value) => field.onChange(value)}
                errorMessage={errors.name?.message}
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
          <MainButton className="w-full mt-4" type="submit" title="Send" />
        </form>
      </div>
    </main>
  );
};

export default RegisterCinemaLayout;
