import clientPromise from "@/lib/mongodb";
import { NextRequest } from "next/server";
import { z } from "zod";

export async function POST(request: NextRequest) {
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

  return new Response("Hello, Next.js!", {
    status: 200,
  });
}

export async function GET() {
  try {
    console.log("Fetching users...");
    const client = await clientPromise;

    console.log(client);

    if (!client) return;

    const db = client.db("db");

    const users = await db.collection("users").find({}).toArray();

    console.log(users);
    console.log("Users fetched");
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Error fetching users", { status: 500 });
  }
}
