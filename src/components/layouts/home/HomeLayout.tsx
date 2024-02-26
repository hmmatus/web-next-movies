"use client";
import CustomButton from "@/components/elements/buttons/customButton/CustomButton";
import ProductCard from "@/components/elements/cards/productCard/ProductCard";
import { ProductI } from "@/models/product";
import { useAppDispatch } from "@/redux/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type HomeLayoutP = {
  products: ProductI[];
};
const HomeLayout = ({ products }: HomeLayoutP) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

 
  return (
    <main>
      
    </main>
  );
};

export default HomeLayout;
