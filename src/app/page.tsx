import HomeLayout from "@/components/layouts/home/HomeLayout";
import axios from "axios";
async function getData() {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);
    return res.data;
  } catch (error) {
    throw new Error(`${error}`)
  }
}
export default async function Home() {
  const data = await getData();
  return <HomeLayout products={data}/>
  

}