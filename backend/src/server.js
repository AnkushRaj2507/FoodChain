import express from "express";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import foodRoutes from "./routes/foodRoutes.js";

// deployment
import path from "path";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;
const app = express();

// deploy
const __dirname = path.resolve();

// Middleware
app.use(cors());
app.use(express.json());

// HTTP server
const server = createServer(app);

// Socket.IO setup 
export const io = new Server(server, {
  cors: {
    origin: "*", // You can restrict this to your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

// Middleware to attach io instance to requests
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);

// Socket.IO Events
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

app.get("/", (req, res) => {
  res.send("Food Donation Platform API is running...");
});

// deploy
// app.use(express.static(path.join(__dirname, "frontend/dist")));
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
// });


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});