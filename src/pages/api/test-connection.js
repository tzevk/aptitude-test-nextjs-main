// pages/api/test-connection.js
import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);

    // Just list collections as a sanity check
    const collections = await db.listCollections().toArray();

    res.status(200).json({
      message: "Connected to MongoDB successfully!",
      collections: collections.map((col) => col.name),
    });
  } catch (err) {
    console.error("MongoDB connection error:", err);
    res.status(500).json({ error: "Error connecting to MongoDB" });
  }
}