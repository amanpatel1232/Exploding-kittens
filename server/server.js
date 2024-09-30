import express from "express";
import { config } from "dotenv";
import userRoutes from "./routes/game.routes.js";
import path from "path";
import { fileURLToPath } from 'url';

// Get the __filename and __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
let __dirname = path.dirname(__filename);

// Move up to the project root directory
__dirname = path.join(__dirname, '..'); // Adjust according to your structure

console.log("__dirname", __dirname); // This should now point to project-root

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
app.use(express.static(path.join(__dirname, "frontend", "dist"))); // Adjusted path

// Handle React routing, return all requests to the index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html")); // Adjusted path
});
