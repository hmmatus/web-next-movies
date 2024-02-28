import { PaymentI } from "@/models/payment";
import { service } from "../config";
import { paymentRoutes } from "./paymentRoutes";

export const paymentService = {
  makePayment: (data: PaymentI) => {
    return service.post(paymentRoutes.makePayment(), {
      data
    })
  }
}