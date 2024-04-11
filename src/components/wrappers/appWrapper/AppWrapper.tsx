"use client"
import React from "react"
import { type ReactNode } from "react"
import { Provider } from "react-redux"
import store from "@/redux/store"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import NavBar from "@/components/elements/navbar/NavBar"

interface Props {
  children: ReactNode
}
const AppWrapper = ({ children }: Props): ReactNode => {
  const queryClient = new QueryClient()
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <NavBar />
        {children}
      </QueryClientProvider>
    </Provider>
  )
}

export default AppWrapper
