"use client"
import TransactionCard from "@/components/elements/cards/Transactions/TransactionCard"
import {
  type GetTransactionParams,
  type GetTransactionResponse,
} from "@/models/transaction.model"
import transactionService from "@/service/transaction/transactionService"
import { useQuery } from "@tanstack/react-query"
import { Spin } from "antd"
import { useState } from "react"

async function fetchLogs(
  data: GetTransactionParams,
): Promise<GetTransactionResponse> {
  const response = await transactionService.getTransaction(data)
  return response
}

export default function Page(): JSX.Element {
  const [currentPage] = useState(1)
  const { data, isLoading } = useQuery({
    queryKey: ["logs"],
    queryFn: async (): Promise<GetTransactionResponse> =>
      await fetchLogs({ currentPage, limit: 10 }),
  })
  return (
    <main>
      <section className="flex flex-col items-center justify-center gap-4">
        <h1>Logs</h1>
        {isLoading && <Spin size="large" tip="Loading" />}
        {data?.data.map((elto) => (
          <TransactionCard key={elto.id} transaction={elto} />
        ))}
      </section>
    </main>
  )
}
