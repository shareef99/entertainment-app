import clientPromise from "@/lib/mongodb";
import { NextRequest } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const schema = z.object({
      email: z.string().email(),
      password: z.string().min(1, "required"),
    });
    const payload = await request.json();
    const parseResult = schema.safeParse(payload);

    if (!parseResult.success) {
      return new Response(
        parseResult.error.errors
          .map((e) => `${e.path} ${e.message}`)
          .join(" , "),
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

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 400,
      });
    }

    const isValidPassword = await bcrypt.compare(
      parseResult.data.password,
      user.password,
    );

    if (!isValidPassword) {
      return new Response(JSON.stringify({ message: "Invalid password" }), {
        status: 400,
      });
    }

    return new Response(JSON.stringify({ message: "Login successful", user }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error logging in" }), {
      status: 400,
    });
  }
}

export async function GET() {
  try {
    const client = await clientPromise;

    if (!client) {
      return new Response(
        JSON.stringify({ message: "Error connecting to MongoDB" }),
        { status: 500 },
      );
    }

    const db = client.db("db");

    const users = await db.collection("users").find({}).toArray();

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error fetching users" }), {
      status: 500,
    });
  }
}
