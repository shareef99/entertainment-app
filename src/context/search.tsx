"use client";

import { ReactNode, createContext, useContext, useState } from "react";

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
