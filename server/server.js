import express from "express";
import { config } from "dotenv";
import userRoutes from "./routes/game.routes.js";
import cors from "cors"; // Import CORS
import { fileURLToPath } from 'url';

// Get the __filename and __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config();

const app = express();

// CORS configuration
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

// No need to serve static files or handle React routing since the frontend is deployed separately
