"use client";

import { useShowDetail } from "@/app/(main)/tv/query";
import ErrorMessage from "@/components/error-message";
import Loading from "@/components/loading";
import { getDummyArray } from "@/helpers/general";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MdOutlineStarOutline, MdOutlineStarPurple500 } from "react-icons/md";
import { FaImdb, FaLink } from "react-icons/fa";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const { data, error } = useShowDetail(id);

  return error ? (
    <ErrorMessage error={error} />
  ) : !data ? (
    <Loading fullscreen />
  ) : (
    <main className="flex gap-16">
      <div className="relative h-[650px] min-w-[500px]">
        <Image
          src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
          alt={data.name}
          className="rounded-md object-cover"
          priority
          fill
        />
      </div>
      <section className="w-full">
        <h1 className="text-4xl">{data.name}</h1>
        <p className="ml-0.5 mt-2 text-lg text-white/60">{data.tagline}</p>
        <div className="mt-8 flex items-center gap-2">
          <span className="text-5xl">{Math.round(data.vote_average / 2)}</span>
          <div className="mb-1 flex">
            {getDummyArray(Math.round(data.vote_average / 2)).map((i) => (
              <MdOutlineStarPurple500 key={i} />
            ))}
            {getDummyArray(5 - Math.round(data.vote_average / 2)).map((i) => (
              <MdOutlineStarOutline key={i} />
            ))}
          </div>
        </div>
        <div className="mt-8 flex justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-lg text-white/60">Language</span>

            <span className="text-xl">
              {data.spoken_languages[0]?.english_name || "N/A"}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-lg text-white/60">First Air</span>
            <span className="text-xl">{data.first_air_date}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-lg text-white/60">last Air</span>
            <span className="text-xl">{data.last_air_date}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-lg text-white/60">Status</span>
            <span className="text-xl">{data.status}</span>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-2">
          <span className="text-xl font-medium">Genres</span>
          <div className="flex flex-wrap gap-4">
            {data.genres.map((genre) => (
              <span
                key={genre.id}
                className="rounded-lg bg-white px-2 py-1 font-semibold text-dark-blue"
              >
                {genre.name}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-2">
          <span className="text-xl font-medium">Synopsis</span>
          <p className="text-lg text-white">{data.overview}</p>
        </div>
        <div className="mt-8 flex gap-4">
          {data.homepage && (
            <Link
              // @ts-ignore
              href={data.homepage}
              className="flex w-fit items-center gap-2 rounded-md bg-light-blue px-4 py-1 text-lg font-medium text-white"
              target="_blank"
              rel="noreferrer"
            >
              Website
              <FaLink className="inline-block" />
            </Link>
          )}
        </div>
      </section>
    </main>
  );
}
