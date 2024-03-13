import * as yup from "yup";

export const registerUserSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required().min(8),
  confirmPassword: yup.string().required().oneOf([yup.ref('password')], 'Passwords must match')
})