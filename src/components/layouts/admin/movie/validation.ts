import { CustomFileObject } from "@/models/movie";
import * as yup from "yup";

export const movieSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  stock: yup
    .number()
    .required()
    .test("greaterThanCero", "Value must be greater than 0", (value) => {
      return value > 0;
    }),
  rentAmount: yup
    .number()
    .required()
    .test("greaterThanCero", "Value must be greater than 0", (value) => {
      return value > 0;
    }),
  saleAmount: yup
    .number()
    .required()
    .test("greaterThanCero", "Value must be greater than 0", (value) => {
      return value > 0;
    }),
  availability: yup.string().required(),
  image: yup
    .mixed()
    .required("File is required")
    .test("fileType", "Invalid file type", (value) => {
      const fileValue = value as CustomFileObject | undefined;
      return (
        fileValue &&
        ["image/jpeg", "image/png", "image/gif"].includes(fileValue.type)
      );
    })
    .test("fileSize", "File size is too large", (value) => {
      const fileValue = value as CustomFileObject | undefined;
      return fileValue && fileValue.size <= 5000 * 5000;
    }),
});
