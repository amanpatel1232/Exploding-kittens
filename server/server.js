import express from "express";
import { config } from "dotenv";
import userRoutes from "./routes/game.routes.js";
import path from "path";
import { fileURLToPath } from 'url';

// Get the __filename and __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

// Use API routes
app.use("/api/game", userRoutes);

// Remove the static file serving code, since frontend is on Netlify
// Comment out or remove these lines
/*
app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});
*/

// Add a health check endpoint (optional)
app.get("/health", (req, res) => {
  res.status(200).send("Server is running!");
});
