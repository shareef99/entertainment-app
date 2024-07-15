"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "@/types/user";
import {
  errorNotification,
  loadingNotification,
  successNotification,
} from "@/helpers/notification";
import { axiosClient } from "@/axios";
import { useRouter } from "next/navigation";
import { parseError } from "@/helpers/general";
import { MovieOrShow } from "@/types/tmdb";

type SearchContextType = {
  search: string;
  setSearch: (_search: string) => void;
};

const SearchContextDefaultValues: SearchContextType = {
  search: "",
  setSearch: () => {},
};

const SearchContext = createContext<SearchContextType>(
  SearchContextDefaultValues,
);

export function useSearchContext() {
  return useContext(SearchContext);
}

type Props = {
  children: ReactNode;
};

export default function SearchProvider({ children }: Props) {
  // State
  const [search, setSearch] = useState<string>("");

  // Functions
  const updateSearch = (search: string) => {
    setSearch(search);
  };

  return (
    <SearchContext.Provider value={{ search, setSearch: updateSearch }}>
      {children}
    </SearchContext.Provider>
  );
}
