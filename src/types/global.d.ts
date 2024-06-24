import { MongoClient } from "mongodb";

declare global {
  export var _mongoClientPromise: Promise<MongoClient> | undefined;
}
