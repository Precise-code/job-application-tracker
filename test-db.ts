import { MongoClient } from "mongodb";

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set");

  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 8000 });
  try {
    await client.connect();
    console.log("Connected:", await client.db().command({ ping: 1 }));
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("FAILED:", err.name, "-", err.message);
});