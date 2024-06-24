import { MongoClient, MongoClientOptions } from "mongodb";

const uri = process.env.MONGO_DB_URL;
const options: MongoClientOptions = {};

if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}

const client = new MongoClient(uri, options);
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV !== "production") {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect();
  }

  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = client.connect();
}

export default clientPromise;
