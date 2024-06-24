import { axiosTMDBClient } from "@/axios";
import { Movie, MovieDetail } from "@/types/tmdb";
import { useQuery } from "@tanstack/react-query";

export const movieKeys = {
  movies: (page: number) => ["movies", "page", page],
  movieDetail: (id: string) => ["movie details", "id", id],
} as const;

// Queries
export const useMovie = (page: number) => {
  return useQuery({
    queryKey: movieKeys.movies(page),
    queryFn: async () => {
      const { data } = await axiosTMDBClient.get<{
        page: number;
        results: Array<Movie>;
        total_pages: number;
        total_results: number;
      }>("/trending/movie/week", {
        params: { page, language: "en-US" },
      });
      return data;
    },
  });
};

export const useMovieDetail = (id: string) => {
  return useQuery({
    queryKey: movieKeys.movieDetail(id),
    queryFn: async () => {
      const { data } = await axiosTMDBClient.get<MovieDetail>(`/movie/${id}`, {
        params: { language: "en-US" },
      });
      return data;
    },
  });
};
