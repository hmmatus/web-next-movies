"use client";
import ProtectedRoute from "@/components/elements/protected/ProtectedRoute/ProtectedRoute";
import ErrorLayout from "@/components/layouts/error/ErrorLayout";
import LoadingComponent from "@/components/layouts/loading/LoadingLayout";
import MovieDetailLayout from "@/components/layouts/movieDetail/MovieDetailLayout";
import { UserRole } from "@/models/user";
import { movieService } from "@/service/movie/movieService";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

async function getMovie(cinemaId: string, movieId: string) {
  try {
    const result = await movieService.getMovieById(cinemaId, movieId);
    return result.data;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

async function PageContent() {
  const params = useSearchParams();
  const idCinema = params.get("idCinema") || "";
  const idMovie = params.get("idMovie") || "";
  try {
    const data = await getMovie(idCinema, idMovie);
    return <MovieDetailLayout movie={data} idCinema={idCinema} />;
  } catch (error) {
    return <ErrorLayout error={`${error}`} reset={() => {}} />;
  }
}
export default function Page() {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <PageContent />
    </Suspense>
  );
}
