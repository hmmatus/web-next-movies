"use client"
import React from "react"
import { type ReactNode } from "react"
import { Provider } from "react-redux"
import store from "@/redux/store"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

interface Props {
  children: ReactNode
}
const AppWrapper = ({ children }: Props): ReactNode => {
  const queryClient = new QueryClient()
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  )
}

export default AppWrapper
