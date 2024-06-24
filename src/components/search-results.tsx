import Bookmark from "@/components/bookmark";
import { MovieOrShow } from "@/types/tmdb";
import dayjs from "dayjs";
import Image from "next/image";
import { MdLocalMovies } from "react-icons/md";

type Props = {
  searchData: Array<MovieOrShow>;
  query: string;
  whichPage: "homepage" | "movies" | "tv" | "bookmarks";
};

export default function SearchResults({ searchData, query, whichPage }: Props) {
  return (
    <section>
      <h1>Search Results for {query}</h1>
      <div className="mt-4 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {searchData
          .filter((x) => {
            if (whichPage === "movies") {
              return x.media_type === "movie";
            } else if (whichPage === "tv") {
              return x.media_type === "tv";
            } else if (whichPage === "homepage") {
              return true;
            } else {
              return true;
            }
          })
          .map((movie) => (
            <div key={movie.id} className="relative">
              <Bookmark movieOrShow={movie} />
              {movie.backdrop_path ? (
                <Image
                  alt={movie.title || movie.name || ""}
                  src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                  width={500}
                  height={100}
                  className="h-auto w-auto rounded-md opacity-60"
                />
              ) : (
                <div className="relative h-[180px] w-auto rounded-md bg-white/75 opacity-60">
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-black">
                    No Image
                  </div>
                </div>
              )}
              <div className="mt-2">
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <span>
                    {dayjs(movie.release_date || movie.first_air_date).format(
                      "YYYY",
                    )}
                  </span>
                  <div className="h-1 w-1 rounded-full bg-white"></div>
                  <div className="flex items-center gap-1">
                    <MdLocalMovies />
                    <span>
                      {movie.media_type === "movie"
                        ? "Movie"
                        : movie.media_type === "tv"
                          ? "TV Series"
                          : "Person"}
                    </span>
                  </div>
                  <div className="h-1 w-1 rounded-full bg-white"></div>
                  <span>{movie.adult ? "R" : "PG"}</span>
                </div>
                <div className="text-lg">{movie.title || movie.name}</div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
