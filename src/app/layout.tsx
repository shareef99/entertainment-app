import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/app/query-provider";
import { ReactNode } from "react";
import SearchProvider from "@/context/search";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Entertainment App AlmaBetter",
  description:
    "The Entertainment App allows users to search for their preferred movies or TV series and provides the added functionality of bookmarking their favorites. ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <QueryProvider>
          <SearchProvider>{children}</SearchProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
