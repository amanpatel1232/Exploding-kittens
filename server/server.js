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

// CORS configuration with multiple origins
const allowedOrigins = [
  'http://localhost:5173', // Your local development URL
  'https://your-app-name.netlify.app', // Your deployed Netlify URL
];

app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, origin); // Allow the request
    } else {
      callback(new Error('Not allowed by CORS')); // Block the request
    }
  },
  credentials: true, // Enable credentials if your frontend sends cookies or HTTP auth info
}));

app.use(express.json());

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

// Use API routes
app.use("/api/game", userRoutes);

// Serve frontend static files in production (if applicable)
app.use(express.static(path.join(__dirname, "/frontend/dist")));

// Handle React routing, return all requests to the index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});
