import { type CheckoutMovieEnum } from "./movie.model"

export interface TransactionI {
  id: string
  description: string
  type: CheckoutMovieEnum
  idMovie: string
  idUser: string
  expirationDate?: string
  qty: number
}

export interface SaveTransactionI {
  idMovie: string
  idUser: string
  qty: number
  type: CheckoutMovieEnum
  expirationDate?: string
}

export interface GetTransactionParams {
  currentPage: number
  limit: number
}

export interface GetTransactionResponse {
  data: TransactionI[]
  currentPage: number
  pages: number
}
