import { type GetTransactionParams } from "@/models/transaction.model"

const BASE_URL = "/transactions"

const doPayment = (): string => `${BASE_URL}`
const getAllTransactions = ({
  currentPage,
  limit,
}: GetTransactionParams): string =>
  `${BASE_URL}?currentPage=${currentPage}&limit=${limit}`

export const transactionRoutes = {
  doPayment: () => doPayment(),
  getAllTransactions: (data: GetTransactionParams) => getAllTransactions(data),
}
