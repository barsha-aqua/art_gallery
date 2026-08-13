import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import artworksRouter from "./routes/artworks.js";
import authRouter from "./routes/auth.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Gallery API is running" });
});

app.use("/api/artworks", artworksRouter);
app.use("/api/auth", authRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
