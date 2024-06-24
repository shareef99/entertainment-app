"use client";

import Bookmark from "@/components/bookmark";
import ErrorMessage from "@/components/error-message";
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
        <>
          <h1>Bookmarks Movies and TV Shows</h1>
          <ErrorMessage error={"user not logged in"} />
        </>
      ) : (
        <>
          <h1>Bookmarks Movies</h1>
          <section className="mt-4 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {user.bookmarks.map((tv) => (
              <div key={tv.id} className="relative">
                <Bookmark movieOrShow={tv} />
                <Link href={`/tv/${tv.id}`}>
                  {tv.backdrop_path ? (
                    <Image
                      alt={tv.name || tv.title || ""}
                      src={`https://image.tmdb.org/t/p/w500${tv.backdrop_path}`}
                      width={500}
                      height={100}
                      className="h-auto w-auto rounded-md"
                      priority
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
                      <span>{dayjs(tv.first_air_date).format("YYYY")}</span>
                      <div className="h-1 w-1 rounded-full bg-white"></div>
                      <div className="flex items-center gap-1">
                        <MdLocalMovies />
                        <span>
                          {tv.media_type === "tv"
                            ? "Tv"
                            : tv.media_type === "tv"
                              ? "TV Series"
                              : "Person"}
                        </span>
                      </div>
                      <div className="h-1 w-1 rounded-full bg-white"></div>
                      <span>{tv.adult ? "R" : "PG"}</span>
                    </div>
                    <div className="text-lg">{tv.name}</div>
                  </div>
                </Link>
              </div>
            ))}
          </section>
        </>
      )}
    </main>
  );
}
