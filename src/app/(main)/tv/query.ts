import { axiosTMDBClient } from "@/axios";
import { Show, ShowDetail } from "@/types/tmdb";
import { useQuery } from "@tanstack/react-query";

export const showKeys = {
  shows: (page: number) => ["shows", "page", page],
  showDetail: (id: string) => ["show details", "id", id],
} as const;

// Queries
export const useTV = (page: number) => {
  return useQuery({
    queryKey: showKeys.shows(page),
    queryFn: async () => {
      const { data } = await axiosTMDBClient.get<{
        page: number;
        results: Array<Show>;
        total_pages: number;
        total_results: number;
      }>("/trending/tv/week", {
        params: { page, language: "en-US" },
      });
      return data;
    },
  });
};

export const useShowDetail = (id: string) => {
  return useQuery({
    queryKey: showKeys.showDetail(id),
    queryFn: async () => {
      const { data } = await axiosTMDBClient.get<ShowDetail>(`/tv/${id}`, {
        params: { language: "en-US" },
      });
      return data;
    },
  });
};
