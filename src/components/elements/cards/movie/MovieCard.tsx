import { MovieI } from "@/models/movie";
import Image from "next/image";
import Link from "next/link";

type MovieCardP = {
  movie: MovieI;
  onClick(): void;
};
const MovieCard = ({ movie, onClick }: MovieCardP) => {
  return (
    <div
      className="flex flex-col justify-between rounded-lg shadow-md p-2"
    >
      <Image src={movie.image} alt={"Image"} width={"100"} height={"100"} />
      <div>
        <h1 className="text-xl font-bold">{movie.title}</h1>
        <p className="text-lg">{movie.description}</p>
      </div>
      <h3 className="text-lg font-bold text-primary hover:cursor-pointer" onClick={onClick}>Read more</h3>
    </div>
  );
};

export default MovieCard;
