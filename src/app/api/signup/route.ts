import clientPromise from "@/lib/mongodb";
import { NextRequest } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest): Promise<Response> {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(1, "required"),
  });
  const payload = await request.json();
  const parseResult = schema.safeParse(payload);

  if (!parseResult.success) {
    return new Response(
      parseResult.error.errors.map((e) => `${e.path} ${e.message}`).join(" , "),
      { status: 400 },
    );
  }

  const client = await clientPromise;

  if (!client) {
    return new Response("Error connecting to MongoDB", { status: 500 });
  }

  const db = client.db("db");

  const user = await db
    .collection("users")
    .findOne({ email: parseResult.data.email });

  if (user) {
    return new Response(JSON.stringify({ message: "User already exists" }), {
      status: 400,
    });
  }

  bcrypt.hash(parseResult.data.password, 10, async function (error, hash) {
    if (error) {
      return new Response(JSON.stringify({ message: error.message }), {
        status: 500,
      });
    }

    const createdUser = await db.collection("users").insertOne({
      email: parseResult.data.email,
      password: hash,
      bookmarks: [],
    });

    return new Response(
      JSON.stringify({
        message: "User created",
        userId: createdUser.insertedId,
      }),
      {
        status: 200,
      },
    );
  });

  return new Response(JSON.stringify({ message: "User created" }), {
    status: 200,
  });
}
