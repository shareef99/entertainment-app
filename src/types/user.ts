import { MovieOrShow } from "@/types/tmdb";

export type User = {
  id: string;
  email: string;
  bookmarks: MovieOrShow[];
};
