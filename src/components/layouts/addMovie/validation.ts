import { CustomFileObject } from "@/models/movie.model";
import * as yup from "yup";

export const addMovieSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().email().required(),
  availability: yup.bool().required(),
  rentAmount: yup.number().required().min(1),
  saleAmount: yup.number().required().min(1),
  stock: yup.number().required().min(1),
  image: yup.mixed()
  .required('File is required')
  .test('fileType', 'Invalid file type', (value: any) => {
    const fileValue = value as CustomFileObject | undefined;
        return fileValue && ['image/jpeg', 'image/png', 'image/gif'].includes(fileValue.type);
  })
  .test('fileSize', 'File size is too large', (value: any) => {
    const fileValue = value as CustomFileObject | undefined;
    return fileValue && fileValue.size <= 2000 * 2000;
  })
})