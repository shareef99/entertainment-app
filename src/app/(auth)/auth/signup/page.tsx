"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { MdMovie } from "react-icons/md";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthContext } from "@/context/auth";

const schema = z
  .object({
    email: z.string().email(),
    password: z.string().min(1, "can't be empty"),
    repeatPassword: z.string().min(1, "can't be empty"),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "password doesn't match",
    path: ["repeatPassword"],
  });

type FormValues = z.infer<typeof schema>;

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { email: "", password: "", repeatPassword: "" },
    resolver: zodResolver(schema),
  });

  const { signup } = useAuthContext();

  // Functions
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    signup({ email: data.email, password: data.password });
  };

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div>
        <div className="mb-16 flex justify-center">
          <MdMovie className="text-4xl text-red" />
        </div>
        <div className="w-72 rounded-2xl bg-dark-blue p-8 sm:w-96">
          <h2>Sign Up</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-4 flex flex-col gap-4"
          >
            <div className="relative">
              <Input
                placeholder="Email address"
                type="email"
                className="rounded-none border-0 border-b border-light-blue bg-transparent focus:border-white focus:ring-0 active:border-white"
                {...register("email")}
              />
              {errors.email?.message && (
                <p className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-red">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="relative">
              <Input
                placeholder="password"
                type="password"
                className="rounded-none border-0 border-b border-light-blue bg-transparent focus:border-white focus:ring-0 active:border-white"
                {...register("password")}
              />
              {errors.password?.message && (
                <p className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-red">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="relative">
              <Input
                placeholder="Repeat password"
                type="password"
                className="rounded-none border-0 border-b border-light-blue bg-transparent focus:border-white focus:ring-0 active:border-white"
                {...register("repeatPassword")}
              />
              {errors.repeatPassword?.message && (
                <p className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-red">
                  {errors.repeatPassword.message}
                </p>
              )}
            </div>
            <Button variant="red" className="mt-4" type="submit">
              Create an account
            </Button>
          </form>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm font-light">
            <span>Already have an account?</span>
            <Link href="/auth/login" className="text-red">
              Login
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
