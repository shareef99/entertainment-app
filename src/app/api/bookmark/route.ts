import clientPromise from "@/lib/mongodb";
import { NextRequest } from "next/server";

export async function PUT(request: NextRequest): Promise<Response> {
  const payload = await request.json();

  if (!payload) {
    return new Response(JSON.stringify({ message: "Missing payload" }), {
      status: 400,
    });
  }

  const client = await clientPromise;

  if (!client) {
    return new Response("Error connecting to MongoDB", { status: 500 });
  }

  const db = client.db("db");

  const user = await db.collection("users").findOne({ email: payload.email });

  if (!user) {
    return new Response(JSON.stringify({ message: "User not found" }), {
      status: 400,
    });
  }

  const updatedUser = await db
    .collection("users")
    .updateOne(
      { email: payload.email },
      { $set: { bookmarks: payload.bookmarks } },
    );

  return new Response(JSON.stringify(updatedUser), { status: 200 });
}
