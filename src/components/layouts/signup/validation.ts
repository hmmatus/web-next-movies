import * as yup from "yup";
export const signupSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required("Must be a valid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});
