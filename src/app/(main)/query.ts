import { axiosTMDBClient } from "@/axios";
import { MovieOrShow } from "@/types/tmdb";
import { useQuery } from "@tanstack/react-query";

export const homeKeys = {
  trending: (page: number) => ["trending", "page", page],
  search: (query: string) => ["search", "query", query],
} as const;

// Queries
export const useTrending = ({ page }: { page: number }) => {
  return useQuery({
    queryKey: homeKeys.trending(page),
    queryFn: async () => {
      const { data } = await axiosTMDBClient.get<{
        page: number;
        results: Array<MovieOrShow>;
        total_pages: number;
        total_results: number;
      }>("/trending/all/day", {
        params: { page, language: "en-US" },
      });
      return {
        ...data,
        results: data.results.filter((movie) => movie.media_type !== "person"),
      };
    },
  });
};

export const useSearch = ({ query }: { query: string }) => {
  return useQuery({
    queryKey: homeKeys.search(query),
    queryFn: async () => {
      const { data } = await axiosTMDBClient.get<{
        page: number;
        results: Array<MovieOrShow>;
        total_pages: number;
        total_results: number;
      }>("/search/multi", {
        params: { query, page: 1, language: "en-US", include_adult: true },
      });
      return {
        ...data,
        results: data.results.filter((movie) => movie.media_type !== "person"),
      };
    },
    enabled: query !== "",
  });
};
