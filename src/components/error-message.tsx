import { parseError } from "@/helpers/general";

export default function ErrorMessage({ error }: { error: unknown }) {
  return <p className="text-red-500">{parseError(error)}</p>;
}
