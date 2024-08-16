import express from "express";
import { config } from "dotenv";
import cors from "cors";
import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";

export const app = express();
config();

const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(express.json());
// app.use(
//   cors({
//     origin: frontendUrl,
//     credentials: true,
//   })
// );
app.use(cors());

app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Pensieve Backend",
  });
});
