"use client";
import CinemaCard from "@/components/elements/cards/cinema/CinemaCard";
import { CinemaI } from "@/models/cinema";
import { useAppDispatch } from "@/redux/hooks";
import { saveCinema } from "@/redux/slices/cinema";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type HomeLayoutP = {
  cinemas: CinemaI[];
};
const HomeLayout = ({ cinemas }: HomeLayoutP) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const moveToMovies = (cinema: CinemaI) => {
    dispatch(saveCinema(cinema));
    router.push("/movies");
  };

  return (
    <main className="p-4">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold self-center lg:self-start">Select a cinema</h1>
        <div className="grid gap-2 lg:grid-cols-3 lg:max-w-screen-xl">
          {cinemas.map((cinema) => (
            <CinemaCard
              key={cinema.id}
              cinema={cinema}
              onClick={() => moveToMovies(cinema)}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default HomeLayout;
