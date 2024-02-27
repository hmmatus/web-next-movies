import { MovieI } from "@/models/movie";
import { useAppSelector } from "@/redux/hooks";
import { Colors } from "@/styles/colors";
import Image from "next/image";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";

type MovieCardP = {
  movie: MovieI;
  onClick(): void;
  isLiked: boolean;
  onPressLike(): void;
};
const MovieCard = ({ movie, onClick, onPressLike, isLiked }: MovieCardP) => {
  const {id} = useAppSelector(state => state.user);
  return (
    <div className="flex flex-col justify-between rounded-lg shadow-md p-2">
      <Image
        className="self-center"
        src={movie.image}
        alt={"Image"}
        width={200}
        height={200}
      />
      <div className="flex items-center justify-evenly">
        <div>
          <h1 className="text-2xl font-bold">{movie.title}</h1>
          <p className="text-xl mb-4">{movie.description}</p>
        </div>
        <div className={`${!!id ? "": "hidden"} hover:cursor-pointer`} onClick={onPressLike}>
          {isLiked ? (
            <AiFillLike size={30} color={Colors.primary} />
          ) : (
            <AiOutlineLike size={30} color={Colors.primary} />
          )}
        </div>
      </div>
      <div className="hover:cursor-pointer">
        <h3
          className="text-2xl font-bold text-primary"
          onClick={onClick}
        >
          Read more
        </h3>
      </div>
    </div>
  );
};

export default MovieCard;
