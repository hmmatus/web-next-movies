import * as yup from "yup"

export const addMovieSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  availability: yup.boolean().required(),
  rentAmount: yup.number().required().min(1),
  saleAmount: yup.number().required().min(1),
  stock: yup.number().required().min(1),
  image: yup.mixed().required("File is required"),
})

export interface AddMovieSchemaP extends yup.InferType<typeof addMovieSchema> {}
