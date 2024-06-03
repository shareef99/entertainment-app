import Header from "@/components/header";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-col lg:flex-row">
      <Header />
      <section className="py-8">{children}</section>
    </main>
  );
}
