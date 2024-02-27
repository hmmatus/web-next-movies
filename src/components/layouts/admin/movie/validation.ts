
import { CustomFileObject } from "@/models/movie";
import * as yup  from "yup";

export const movieSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  stock: yup.number().required(),
  rentAmount: yup.number().required(),
  saleAmount: yup.number().required(),
  availability: yup.string().required(),
  image: yup.mixed()
  .required('File is required')
  .test('fileType', 'Invalid file type', (value) => {
    const fileValue = value as CustomFileObject | undefined;
        return fileValue && ['image/jpeg', 'image/png', 'image/gif'].includes(fileValue.type);
  })
  .test('fileSize', 'File size is too large', (value) => {
    const fileValue = value as CustomFileObject | undefined;
    return fileValue && fileValue.size <= 2000 * 2000;
  })
});