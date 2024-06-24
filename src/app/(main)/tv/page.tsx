"use client";

import { useTV } from "@/app/(main)/tv/query";
import ErrorMessage from "@/components/error-message";
import Loading from "@/components/loading";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { MdLocalMovies } from "react-icons/md";

export default function Page() {
  // Queries
  const { data, error } = useTV(1);

  return (
    <main>
      <h1>TV</h1>
      {error ? (
        <ErrorMessage error={error} />
      ) : !data ? (
        <Loading fullscreen />
      ) : (
        <section className="mt-4 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data.results.map((tv) => (
            <Link href={`/tv/${tv.id}`} key={tv.id}>
              {tv.backdrop_path ? (
                <Image
                  alt={tv.name}
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
          ))}
        </section>
      )}
    </main>
  );
}
