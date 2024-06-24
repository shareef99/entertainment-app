import { useAuthContext } from "@/context/auth";
import { cn } from "@/lib/utils";
import { MovieOrShow } from "@/types/tmdb";
import { MdBookmark, MdBookmarkBorder } from "react-icons/md";

type Props = {
  className?: string;
  movieOrShow: MovieOrShow;
};

export default function Bookmark({ className, movieOrShow }: Props) {
  const { user, addBookmark, removeBookmark } = useAuthContext();

  const hasBookmark = user?.bookmarks.find((x) => x.id === movieOrShow.id);

  return (
    <button
      className={cn(
        "absolute right-4 top-4 z-50 rounded-full bg-black/50 p-2",
        className,
      )}
      onClick={() => {
        console.log("Clicked", movieOrShow);

        if (hasBookmark) {
          removeBookmark(movieOrShow.id);
          return;
        }

        addBookmark(movieOrShow);
      }}
    >
      {hasBookmark ? (
        <MdBookmark className="text-white" />
      ) : (
        <MdBookmarkBorder className="text-white" />
      )}
    </button>
  );
}
