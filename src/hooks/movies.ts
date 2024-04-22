// hooks/useMoviesData.ts
import {
  type UseQueryResult,
  useMutation,
  useQuery,
  type UseMutationResult,
} from "@tanstack/react-query"
import { movieService } from "@/service/movies/movieService"
import { type GetMovieFilters } from "@/models/user.model"
import { notification } from "antd"
import {
  type GetMovieResponseI,
  type LikeMovieParamsI,
} from "@/models/movie.model"

export const useMoviesData = ({
  onlyAvailable,
  orderBy,
  searchValue,
  currentPage,
  limit,
}: GetMovieFilters): UseQueryResult<GetMovieResponseI> => {
  return useQuery({
    queryKey: ["moviesData"],
    queryFn: async (): Promise<GetMovieResponseI> =>
      await movieService.getMovies({
        onlyAvailable,
        orderBy,
        searchValue,
        currentPage,
        limit,
      }),

    retry: 2,
    enabled: true,
  })
}

export const useMovieLike = (
  refetch: () => void,
): UseMutationResult<any, Error, LikeMovieParamsI, unknown> => {
  return useMutation({
    mutationFn: async (data: LikeMovieParamsI) =>
      await movieService.likeMovie(data),
    onSuccess: () => {
      notification.success({
        message: "Movie Liked!",
        placement: "topRight",
      })
      refetch()
    },
    onError: (error) => {
      notification.error({
        message: error.message,
        placement: "topRight",
      })
    },
  })
}

export const useMovieDislike = (
  refetch: () => void,
): UseMutationResult<any, Error, LikeMovieParamsI, unknown> => {
  return useMutation({
    mutationFn: async (data: LikeMovieParamsI) =>
      await movieService.dislikeMovie(data),
    onSuccess: () => {
      notification.success({
        message: "Movie Disliked!",
        placement: "topRight",
      })
      refetch()
    },
    onError: (error) => {
      notification.error({
        message: error.message,
        placement: "topRight",
      })
    },
  })
}
