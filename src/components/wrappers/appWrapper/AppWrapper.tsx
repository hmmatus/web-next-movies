"use client";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import store from "@/redux/store";
import NavBar from "@/components/elements/navbar/NavBar";
import Footer from "@/components/elements/footer/Footer";

type Props = {
  children: ReactNode;
};
const AppWrapper = ({ children }: Props) => {
  return (
    <Provider store={store}>
      <NavBar />
      {children}
      <Footer />
    </Provider>
  );
};

export default AppWrapper;
