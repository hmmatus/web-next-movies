import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import "react-datepicker/dist/react-datepicker.css";
import AppWrapper from "@/components/wrappers/appWrapper/AppWrapper";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const lato = Lato({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Movies App",
  description: "Movies App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lato.className}>
        <ToastContainer />
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}
