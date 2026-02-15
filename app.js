const express = require("express");
require('dotenv').config();
const { connectDB } = require("./db");
const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/blog");

const PORT = process.env.PORT || 7000;
const app = express();

// Connect DB
connectDB();

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

app.get("/", (req, res) => {
  res.send("Blogging API is up. See /api/blogs and /api/auth");
});

// Global error handler (simple)
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ message: err.message || "Internal Server Error" });
});

if (require.main === module) {
  app.listen(PORT, () =>
    console.log(`Server running on port: http://localhost:${PORT}`)
  );
}

module.exports = app;