// pages/api/register.js
import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ error: "Method not allowed. Use POST instead." });
  }

  const { username, email, phone, branch, college } = req.body;

  // Server-side validation (a little redundancy)
  if (
    !username ||
    !email ||
    !phone ||
    !branch ||
    !college ||
    typeof username !== "string" ||
    !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ||
    !phone.match(/^[0-9]{10}$/)
  ) {
    return res.status(400).json({ error: "Invalid input data." });
  }

  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const usersCollection = db.collection("users");

    // Optionally check if this email already exists:
    const existing = await usersCollection.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: "Email is already registered." });
    }

    // Create a new user document
    const newUser = {
      username: username.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      branch,
      college,
      createdAt: new Date(),
    };

    const insertResult = await usersCollection.insertOne(newUser);
    if (!insertResult.insertedId) {
      throw new Error("Failed to insert user record.");
    }

    // You could return the newly created document or simply success message
    return res
      .status(201)
      .json({ message: "User registered successfully.", userId: insertResult.insertedId });
  } catch (error) {
    console.error("Error in /api/register:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}