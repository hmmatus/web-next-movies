import type React from "react"
import type { Metadata } from "next"
import { Lato } from "next/font/google"
import "./globals.css"
import AppWrapper from "@/components/wrappers/appWrapper/AppWrapper"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { AntdRegistry } from "@ant-design/nextjs-registry"
import { type ReactNode } from "react"
const lato = Lato({ subsets: ["latin"], weight: "400" })

export const metadata: Metadata = {
  title: "Movies App",
  description: "Movies App",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>): ReactNode {
  return (
    <html lang="en">
      <body className={lato.className}>
        <ToastContainer />
        <AntdRegistry>
          <AppWrapper>{children}</AppWrapper>
        </AntdRegistry>
      </body>
    </html>
  )
}
