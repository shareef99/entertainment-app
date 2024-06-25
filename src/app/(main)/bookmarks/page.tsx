"use client";

import Bookmark from "@/components/bookmark";
import { useAuthContext } from "@/context/auth";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { MdLocalMovies } from "react-icons/md";

export default function Page() {
  const { user } = useAuthContext();

  return (
    <main>
      {user === null ? (
        <section className="space-y-2">
          <h1>Bookmarks Movies and TV Shows</h1>
          <Link
            href="/auth/login"
            className="text-xl text-red underline underline-offset-4"
          >
            Login to view bookmarks
          </Link>
        </section>
      ) : (
        <section>
          {user.bookmarks.length === 0 && (
            <h1>It looks like you don&apos;t have any bookmarks</h1>
          )}
          {user.bookmarks.filter((movie) => movie.media_type === "movie")
            .length > 0 && <h1>Bookmarks Movies</h1>}
          <div className="mt-4 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {user.bookmarks
              .filter((movie) => movie.media_type === "movie")
              .map((movie) => (
                <div key={movie.id} className="relative">
                  <Bookmark movieOrShow={movie} />
                  <Link href={`/movies/${movie.id}`}>
                    <Image
                      alt={movie.title || movie.name || ""}
                      src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                      width={500}
                      height={100}
                      className="h-auto w-auto rounded-md"
                      priority
                    />
                    <div className="mt-2">
                      <div className="flex items-center gap-2 text-sm text-white/80">
                        <span>
                          {dayjs(
                            movie.release_date || movie.first_air_date,
                          ).format("YYYY")}
                        </span>
                        <div className="h-1 w-1 rounded-full bg-white"></div>
                        <div className="flex items-center gap-1">
                          <MdLocalMovies />
                          <span>
                            {movie.media_type === "movie"
                              ? "Movie"
                              : "TV Series"}
                          </span>
                        </div>
                        <div className="h-1 w-1 rounded-full bg-white"></div>
                        <span>{movie.adult ? "R" : "PG"}</span>
                      </div>
                      <div className="text-lg">{movie.title || movie.name}</div>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
          {user.bookmarks.filter((movie) => movie.media_type === "tv").length >
            0 && <h1>Bookmarks TV Shows</h1>}
          <div className="mt-4 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {user.bookmarks
              .filter((movie) => movie.media_type === "tv")
              .map((movie) => (
                <div key={movie.id} className="relative">
                  <Bookmark movieOrShow={movie} />
                  <Link href={`/tv/${movie.id}`}>
                    <Image
                      alt={movie.title || movie.name || ""}
                      src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                      width={500}
                      height={100}
                      className="h-auto w-auto rounded-md"
                      priority
                    />
                    <div className="mt-2">
                      <div className="flex items-center gap-2 text-sm text-white/80">
                        <span>
                          {dayjs(
                            movie.release_date || movie.first_air_date,
                          ).format("YYYY")}
                        </span>
                        <div className="h-1 w-1 rounded-full bg-white"></div>
                        <div className="flex items-center gap-1">
                          <MdLocalMovies />
                          <span>
                            {movie.media_type === "movie"
                              ? "Movie"
                              : "TV Series"}
                          </span>
                        </div>
                        <div className="h-1 w-1 rounded-full bg-white"></div>
                        <span>{movie.adult ? "R" : "PG"}</span>
                      </div>
                      <div className="text-lg">{movie.title || movie.name}</div>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </section>
      )}
    </main>
  );
}
