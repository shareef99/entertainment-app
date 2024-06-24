"use client";

import { ReactNode, createContext, useContext, useState } from "react";

type SearchContextType = {
  query: string;
  setQuery: (_query: string) => void;
};

const SearchContextDefaultValues: SearchContextType = {
  query: "",
  setQuery: () => {},
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
  const [query, setQuery] = useState<string>("");

  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
