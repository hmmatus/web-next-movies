"use client"
import MainButton from "@/components/elements/buttons/MainButton/MainButton";
import { useRouter } from "next/navigation";

const AdminHomeLayout = () => {
  const router = useRouter();
  const handleAddMovie = () => {
    router.push("/admin/addMovie");
  };
  return (
    <main>
      <div className="flex items-center justify-center">
        <MainButton title="Add movie" onClick={handleAddMovie} />
      </div>
    </main>
  );
};

export default AdminHomeLayout;
