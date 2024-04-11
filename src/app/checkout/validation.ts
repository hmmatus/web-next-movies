import * as Yup from "yup"

const checkoutSchema = Yup.object().shape({
  qty: Yup.number().required("Quantity is required").min(1),
  card: Yup.string().required(" Card is required for payment"),
  name: Yup.string().required("Name is required for payment"),
  expiration: Yup.string()
    .required("Expiration is required for payment"),
  cvv: Yup.string()
    .required("CVV is required")
    .matches(/^[0-9]{3}$/, "CVV must be 3 digits long"),
})

export default checkoutSchema
