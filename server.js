import express from "express";
import cors from "cors";
import quizRoutes from "./routes/quizRoutes.js";

const app = express();
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
}));
app.use(express.json());

app.use("/api", quizRoutes);

// app.listen(5000, () => console.log("✅ Backend running on http://localhost:5000"));
export default app;
