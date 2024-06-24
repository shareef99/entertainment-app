import { AxiosError } from "axios";

export function parseError(error: unknown): string {
  if (typeof error === "string") {
    return error;
  }

  if (error instanceof AxiosError) {
    if (error.response) {
      return error.response.data.message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Unknown error";
}

export function getDummyArray(length: number) {
  return Array.from({ length }, (_, i) => i + 1);
}
