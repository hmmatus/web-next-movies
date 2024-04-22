import type React from "react"
import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Flex } from "antd"
import { type SubmitHandler, useForm } from "react-hook-form"
import { type AddMovieSchemaP, addMovieSchema } from "./validation"
import type * as yup from "yup"
import InputText from "@/components/elements/form/inputs/inputText/InputText"
import CustomInputNumber from "@/components/elements/form/inputs/inputNumber/InputNumber"
import InputFile from "@/components/elements/form/inputs/inputFile/InputFile"
import InputSwitch from "@/components/elements/form/inputs/inputSwitch/InputSwitch"

interface AddMovieLayoutP {
  onAddMovie: (data: any) => void
  loading: boolean
  movie?: AddMovieSchemaP
}

const initialState = {
  title: "",
  description: "",
  saleAmount: 1,
  rentAmount: 1,
  stock: 1,
  image: {},
  availability: false,
}
const MovieFormLayout: React.FC<AddMovieLayoutP> = ({
  onAddMovie,
  loading,
  movie,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: movie ?? initialState,
    resolver: yupResolver(addMovieSchema),
  })

  const onSubmit: SubmitHandler<yup.InferType<typeof addMovieSchema>> = (
    data,
  ) => {
    onAddMovie({
      ...data,
    })
  }
  return (
    <Flex vertical className="p-4 md:mx-auto items-center md:justify-center">
      <form
        className="p-4 md:bg-table-background-primary md:shadow-md md:max-w-screen-md md:rounded-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>Add a Movie</h2>
        <InputText
          label="Title"
          name="title"
          errorMessage={errors.title?.message ?? ""}
          control={control}
          disabled={loading}
        />
        <InputText
          label="Description"
          name="description"
          errorMessage={errors.description?.message ?? ""}
          control={control}
          disabled={loading}
        />
        <CustomInputNumber
          label="Sale amount"
          name="saleAmount"
          errorMessage={errors.saleAmount?.message ?? ""}
          control={control}
          disabled={loading}
          min={1}
          defaultValue={1}
        />
        <CustomInputNumber
          label="Rent amount"
          name="rentAmount"
          errorMessage={errors.rentAmount?.message ?? ""}
          control={control}
          disabled={loading}
          min={1}
        />
        <CustomInputNumber
          label="Stock"
          name="stock"
          errorMessage={errors.stock?.message ?? ""}
          control={control}
          disabled={loading}
          min={1}
        />
        <InputSwitch
          label="Available"
          name="availability"
          errorMessage={errors.availability?.message ?? ""}
          control={control}
        />
        <InputFile
          label="Image"
          name="image"
          errorMessage={errors.image?.message ?? ""}
          control={control}
        />
        <Button
          type="primary"
          className="mt-4"
          disabled={loading}
          loading={loading}
          htmlType="submit"
        >
          Add Movie
        </Button>
      </form>
    </Flex>
  )
}

export default MovieFormLayout
