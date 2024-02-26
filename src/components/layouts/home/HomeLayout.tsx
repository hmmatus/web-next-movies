"use client";
import CinemaCard from "@/components/elements/cards/cinema/CinemaCard";
import { CinemaI } from "@/models/cinema";
import { useAppDispatch } from "@/redux/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type HomeLayoutP = {
  cinemas: CinemaI[];
};
const HomeLayout = ({ cinemas }: HomeLayoutP) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return (
    <main>
      <h1>Select a cinema</h1>
      <div className="grid">
        {cinemas.map((cinema) => (
          <CinemaCard key={cinema.id} cinema={cinema} />
        ))}
      </div>
    </main>
  );
};

export default HomeLayout;
