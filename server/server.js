import express from "express";
import { config } from "dotenv";
import userRoutes from "./routes/game.routes.js";
import path from "path";
import { fileURLToPath } from 'url';

// Get the __filename and __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
let __dirname = path.dirname(__filename);

// Move up one directory level (from /server to the parent folder)
__dirname = path.join(__dirname, '..');
console.log("__dirname", __dirname);
config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

// Use API routes
app.use("/api/game", userRoutes);

// Serve frontend static files in production
if (process.env.NODE_ENV === "production") {
  // Serve static files from the frontend build folder
  app.use(express.static(path.join(__dirname, "frontend", "dist")));

  // Handle React routing, return all requests to the index.html
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
  });
}
