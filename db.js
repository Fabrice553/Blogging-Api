// db.js
const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_DB_CONNECTION_URL = process.env.MONGO_DB_CONNECTION_URL;

async function connectDB() {
  if (!MONGO_DB_CONNECTION_URL) {
    console.warn("MONGO_DB_CONNECTION_URL not set - skipping DB connection");
    return;
  }

  // quick sanity check (must start with proper scheme)
  if (!MONGO_DB_CONNECTION_URL.startsWith('mongodb://') &&
      !MONGO_DB_CONNECTION_URL.startsWith('mongodb+srv://')) {
    console.error("Invalid MONGO_DB_CONNECTION_URL. It must start with 'mongodb://' or 'mongodb+srv://'");
    console.error("Current value:", MONGO_DB_CONNECTION_URL);
    return;
  }

  try {
    // No legacy options here — mongoose/driver use sensible defaults
    await mongoose.connect(MONGO_DB_CONNECTION_URL);
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Database connection failed:", err);
  }

  mongoose.connection.on('error', (err) => {
    console.error("Database connection error", err);
  });
}

module.exports = { connectDB };