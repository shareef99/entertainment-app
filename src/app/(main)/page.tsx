"use client";

import { useTrending } from "@/app/(main)/query";
import ErrorMessage from "@/components/error-message";
import Loading from "@/components/loading";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import dayjs from "dayjs";
import { MdLocalMovies } from "react-icons/md";
import Link from "next/link";

export default function Page() {
  // Queries
  const { data: trendingData, error: trendingError } = useTrending({ page: 1 });
  const { data: recommendedData, error: recommendedError } = useTrending({
    page: 2,
  });

  return (
    <section>
      <h1>Trending</h1>
      {trendingError ? (
        <ErrorMessage error={trendingError} />
      ) : !trendingData ? (
        <Loading />
      ) : (
        <Carousel>
          <CarouselContent>
            {trendingData.results.map((movie) => (
              <CarouselItem
                key={movie.id}
                className="relative mt-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <Link
                  href={
                    movie.media_type === "movie"
                      ? `/movies/${movie.id}`
                      : movie.media_type === "tv"
                        ? `/tv/${movie.id}`
                        : "/"
                  }
                  key={movie.id}
                >
                  <Image
                    alt={movie.title || movie.name || ""}
                    src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                    width={300}
                    height={200}
                    className="rounded-md opacity-60"
                    priority
                  />
                  <div className="absolute bottom-4 left-8">
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
                          {movie.media_type === "movie" ? "Movie" : "TV Series"}
                        </span>
                      </div>
                      <div className="h-1 w-1 rounded-full bg-white"></div>
                      <span>{movie.adult ? "R" : "PG"}</span>
                    </div>
                    <div className="text-lg">{movie.title || movie.name}</div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      )}
      <h1>Recommended for you</h1>
      {recommendedError ? (
        <ErrorMessage error={recommendedError} />
      ) : !recommendedData ? (
        <Loading />
      ) : (
        <section className="mt-4 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {recommendedData.results.map((movie) => (
            <Link
              href={
                movie.media_type === "movie"
                  ? `/movies/${movie.id}`
                  : movie.media_type === "tv"
                    ? `/tv/${movie.id}`
                    : "/"
              }
              key={movie.id}
            >
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
                    {dayjs(movie.release_date || movie.first_air_date).format(
                      "YYYY",
                    )}
                  </span>
                  <div className="h-1 w-1 rounded-full bg-white"></div>
                  <div className="flex items-center gap-1">
                    <MdLocalMovies />
                    <span>
                      {movie.media_type === "movie" ? "Movie" : "TV Series"}
                    </span>
                  </div>
                  <div className="h-1 w-1 rounded-full bg-white"></div>
                  <span>{movie.adult ? "R" : "PG"}</span>
                </div>
                <div className="text-lg">{movie.title || movie.name}</div>
              </div>
            </Link>
          ))}
        </section>
      )}
    </section>
  );
}
