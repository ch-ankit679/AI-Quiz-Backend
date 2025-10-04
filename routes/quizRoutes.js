import express from "express";
import { generateQuiz, generateFeedback } from "../controllers/quizController.js";

const router = express.Router();

router.post("/generate-quiz", generateQuiz);
router.post("/feedback", generateFeedback);

export default router;
