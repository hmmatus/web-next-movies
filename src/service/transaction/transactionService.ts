import {
  type GetTransactionResponse,
  type GetTransactionParams,
  type SaveTransactionI,
  type TransactionI,
} from "@/models/transaction.model"
import { service } from "../config"
import { transactionRoutes } from "./transactionRoutes"

const transactionService = {
  addTransaction: async (data: SaveTransactionI): Promise<TransactionI> => {
    return await service.post(transactionRoutes.doPayment(), data)
  },
  getTransaction: async (
    data: GetTransactionParams,
  ): Promise<GetTransactionResponse> => {
    return await service.get(transactionRoutes.getAllTransactions(data))
  },
}

export default transactionService
