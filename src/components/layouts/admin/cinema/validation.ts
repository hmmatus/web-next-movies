import * as yup from "yup";
export const cinemaSchema = yup.object({
  name: yup.string().required(),
  description:yup.string().required(),
});