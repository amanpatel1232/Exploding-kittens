import express from "express";
import { config } from "dotenv";
import userRoutes from "./routes/game.routes.js";
import path from "path";
import cors from "cors"; // Import CORS
import { fileURLToPath } from 'url';

// Get the __filename and __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config();

const app = express();

// Use CORS middleware
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL
  credentials: true, // Enable credentials if needed
}));

app.use(express.json());

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

// Use API routes
app.use("/api/game", userRoutes);

// Serve frontend static files in production
app.use(express.static(path.join(__dirname, "/frontend/dist")));

// Handle React routing, return all requests to the index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});
