"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MdMovie,
  MdDashboard,
  MdLocalMovies,
  MdTv,
  MdOutlineBookmark,
} from "react-icons/md";

export default function Header() {
  const pathname = usePathname();

  return (
    <header
      className={cn(
        "container flex items-center justify-between bg-dark-blue py-4",
        "lg:sticky lg:top-8 lg:ml-8 lg:mt-8 lg:h-[calc(100vh-4rem)] lg:w-fit lg:flex-col lg:items-start lg:rounded-md lg:px-4 lg:py-6",
      )}
    >
      <div>
        <MdMovie className="text-3xl text-red" />
      </div>
      <div className="flex items-center gap-4 lg:flex-col lg:gap-8">
        <Link href="/">
          <MdDashboard
            className={cn(
              "text-2xl text-light-blue transition-colors duration-300 ease-in hover:text-red sm:text-3xl",
              pathname === "/" && "text-white",
            )}
          />
        </Link>
        <Link href="/movies">
          <MdLocalMovies
            className={cn(
              "text-2xl text-light-blue transition-colors duration-300 ease-in hover:text-red sm:text-3xl",
              pathname.includes("/movies") && "text-white",
            )}
          />
        </Link>
        <Link href="/tv">
          <MdTv
            className={cn(
              "text-2xl text-light-blue transition-colors duration-300 ease-in hover:text-red sm:text-3xl",
              pathname.includes("/tv") && "text-white",
            )}
          />
        </Link>
        <Link href="/bookmarks">
          <MdOutlineBookmark
            className={cn(
              "text-2xl text-light-blue transition-colors duration-300 ease-in hover:text-red sm:text-3xl",
              pathname.includes("/bookmarks") && "text-white",
            )}
          />
        </Link>
      </div>
      <div>
        <div className="size-8 rounded-full bg-white"></div>
      </div>
    </header>
  );
}
