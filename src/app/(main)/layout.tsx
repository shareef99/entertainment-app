"use client";

import { useSearch } from "@/app/(main)/query";
import ErrorMessage from "@/components/error-message";
import Header from "@/components/header";
import Loading from "@/components/loading";
import SearchResults from "@/components/search-results";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";

export default function MainLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const searchPlaceholder =
    pathname == "/"
      ? "Search for movies or TV series"
      : pathname.includes("/movies")
        ? "Search for movies"
        : pathname.includes("/tv")
          ? "Search for TV series"
          : "Search for bookmarked shows";

  // State
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  // Effects
  // Effect to debounce the update of the query for 1 second
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 1000);

    return () => clearTimeout(timer);
  }, [search]);

  const {
    data: searchData,
    error: searchError,
    isLoading,
  } = useSearch({ query: debouncedSearch });

  return (
    <main className="flex flex-col lg:flex-row">
      <Header />
      <section className="m-8 w-full">
        <div className="mb-4 flex gap-2">
          <MdSearch className="mb-1 mt-auto text-3xl text-white" />
          <Input
            placeholder={searchPlaceholder}
            className={cn(
              "border-b-1 rounded-none border-x-0 border-t-0 border-transparent bg-transparent px-0 text-lg",
              "focus-visible:border-b focus-visible:border-white focus-visible:ring-0",
            )}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
        {searchError ? (
          <ErrorMessage error={searchError} />
        ) : isLoading ? (
          <Loading fullscreen />
        ) : !searchData ? (
          children
        ) : (
          <SearchResults
            searchData={searchData.results}
            query={debouncedSearch}
            whichPage={
              pathname.includes("/movies")
                ? "movies"
                : pathname.includes("/tv")
                  ? "tv"
                  : pathname.includes("/bookmarked")
                    ? "bookmarks"
                    : "homepage"
            }
          />
        )}
      </section>
    </main>
  );
}
