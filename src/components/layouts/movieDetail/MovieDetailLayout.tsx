import CustomModal from "@/components/elements/modals/customModal/CustomModal";
import { MovieI } from "@/models/movie";
import { UserRole } from "@/models/user";
import { useAppSelector } from "@/redux/hooks";
import { movieService } from "@/service/movie/movieService";
import { Colors } from "@/styles/colors";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { toast } from "react-toastify";

type MovieDetailP = {
  movie: MovieI;
};
type HeaderComponentP = {
  label: string;
  value: string | number;
};

const MovieDetailLayout = ({ movie }: MovieDetailP) => {
  const { role, idCinema } = useAppSelector((state) => state.user);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const router = useRouter();
  const onRemove = async () => {
    try {
      await movieService.deleteMovie(idCinema, movie.id);
      await toast("Movie has been deleted successfully")
      router.back();
    } catch (error) {
      console.log("🚀 ~ onRemove ~ error:", error);
      toast.error(`${error}`);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const HeaderComponent = ({ label, value }: HeaderComponentP) => (
    <div className="flex">
      <h3 className="text-xl font-bold mr-1">{`${label}:`}</h3>
      <p className="text-lg">{value}</p>
    </div>
  );

  const onEdit = () => {

  };
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
            <button onClick={onEdit} className="border rounded-lg mr-2">
              <MdEdit color={Colors.warning} size={40} />
            </button>
            <button onClick={() => setModalIsOpen(true)} className="border rounded-lg">
              <MdDelete color={Colors.error} size={40} />
            </button>
          </div>
        </div>
      </div>
      <CustomModal
        title={`Delete ${movie.title}`}
        description="Are you sure you want to delete it?"
        acceptText="Delete"
        rejectText="Cancel"
        onAccept={onRemove}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      />
    </main>
  );
};

export default MovieDetailLayout;
