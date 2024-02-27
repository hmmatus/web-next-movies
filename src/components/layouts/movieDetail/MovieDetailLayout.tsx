import { MovieI } from "@/models/movie";
import { UserRole } from "@/models/user";
import { useAppSelector } from "@/redux/hooks";
import { Colors } from "@/styles/colors";
import Image from "next/image";
import { MdDelete, MdEdit } from "react-icons/md";

type MovieDetailP = {
  movie: MovieI;
};
type HeaderComponentP = {
  label: string;
  value: string | number;
};

const MovieDetailLayout = ({ movie }: MovieDetailP) => {
  const { role } = useAppSelector((state) => state.user);

  const onRemove = async () => {
    
  };

  const HeaderComponent = ({ label, value }: HeaderComponentP) => (
    <div className="flex">
      <h3 className="text-xl font-bold mr-1">{`${label}:`}</h3>
      <p className="text-lg">{value}</p>
    </div>
  );
  return (
    <main className="p-4">
      <h1 className="text-3xl font-bold">{movie.title}</h1>
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-1 items-center justify-center">
          <Image width={200} height={200} src={movie.image} alt={"Image"} />
        </div>
        <div className="flex-1">
          <p>{movie.description}</p>
          <HeaderComponent label="Rent Amount" value={movie.rentAmount} />
          <HeaderComponent label="Sale Amount" value={movie.saleAmount} />
          <HeaderComponent label="Stock" value={movie.stock} />

          <div className={`${role === UserRole.admin ? "flex" : "hidden"}`}>
            <button onClick={onRemove} className="border rounded-lg mr-2">
              <MdEdit color={Colors.warning} size={40} />
            </button>
            <button onClick={onRemove} className="border rounded-lg">
              <MdDelete color={Colors.error} size={40} />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MovieDetailLayout;
