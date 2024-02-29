"use client";
import MainButton from "@/components/elements/buttons/MainButton/MainButton";
import MovieCard from "@/components/elements/cards/movie/MovieCard";
import { MovieI } from "@/models/movie";
import { useAppSelector } from "@/redux/hooks";
import { movieService } from "@/service/movie/movieService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingComponent from "../../loading/LoadingLayout";
import Image from "next/image";
import { MdDelete, MdEdit } from "react-icons/md";
import CustomModal from "@/components/elements/modals/customModal/CustomModal";
import { toast } from "react-toastify";
import { Colors } from "@/styles/colors";

const AdminHomeLayout = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { idCinema } = useAppSelector((state) => state.user);
  const [movies, setMovies] = useState<MovieI[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<MovieI>();

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const onEdit = () => {};
  const onRemove = async () => {
    try {
      await movieService.deleteMovie(idCinema, selectedMovie?.id || "");
      toast("Movie has been deleted successfully", {
        onClose: () => {
          router.back();
        },
      });
    } catch (error) {
      console.log("🚀 ~ onRemove ~ error:", error);
      toast.error(`${error}`);
    }
  };
  const handleAddMovie = () => {
    router.push("/admin/addMovie");
  };
  async function getMovies(idCinema: string) {
    setLoading(true);
    try {
      const result = await movieService.getMovies(idCinema);
      setMovies(result.data);
    } catch (error) {
      throw new Error(`${error}`);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getMovies(idCinema);
  }, []);
  if (loading) {
    return <LoadingComponent />;
  }
  return (
    <main>
      <div className="flex flex-col items-center justify-center mt-2 p-4">
        <MainButton
          title="Add movie"
          onClick={handleAddMovie}
        />
        <div className="overflow-x-auto md:overflow-x-hidden">
          <table className="table-auto min-w-max">
            <thead>
              <tr>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Stock</th>
                <th className="px-4 py-2">Sale Amount</th>
                <th className="px-4 py-2">Rent Amount</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {movies.map((movie: MovieI) => (
                <tr key={movie.id}>
                  <td className="border px-4 py-2">
                    <Image
                      src={movie.image}
                      width={100}
                      height={100}
                      alt={`Image ${movie.title}`}
                    />
                  </td>
                  <td className="border px-4 py-2">{movie.title}</td>
                  <td className="border px-4 py-2">{movie.description}</td>
                  <td className="border px-4 py-2">{movie.stock}</td>
                  <td className="border px-4 py-2">{movie.saleAmount}</td>
                  <td className="border px-4 py-2">{movie.rentAmount}</td>
                  <td className="border px-4 py-2">
                    <div>
                      <button
                        onClick={onEdit}
                        className="border rounded-lg mr-2"
                      >
                        <MdEdit color={Colors.warning} size={40} />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedMovie(movie);
                        }}
                        className="border rounded-lg"
                      >
                        <MdDelete color={Colors.error} size={40} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <CustomModal
        title={`Delete`}
        description="Are you sure you want to delete it?"
        acceptText="Delete"
        rejectText="Cancel"
        onAccept={() => onRemove()}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      />
    </main>
  );
};

export default AdminHomeLayout;
