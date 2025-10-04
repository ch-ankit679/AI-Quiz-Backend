import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

// 🔹 Fast and clean quiz generator
export const generateQuiz = async (req, res) => {
  try {
    const { topic } = req.body;

    const prompt = `
Generate 5 multiple-choice questions on "${topic}".
Format output strictly as JSON:
[
  {"q": "Question text", "options":["A","B","C","D"], "correct": 1}
]
`;
    const response = await openai.chat.completions.create({
      model: "gpt-oss-20b:free",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7, // balanced speed + variety
    });

    // 🧹 Clean JSON safely
    let text = response.choices[0].message.content.trim();
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    const questions = JSON.parse(text);

    res.json({ questions });
  } catch (err) {
    console.error("Error generating quiz:", err);
    res.status(500).json({ error: "Failed to generate quiz" });
  }
};

// 🔹 Feedback generator
export const generateFeedback = async (req, res) => {
  try {
    const { score, total, topic } = req.body;

    const prompt = `
The user scored ${score}/${total} on a quiz about ${topic}.
Write a short, friendly, motivating feedback message (1 to 2 sentences).
`;

    const response = await openai.chat.completions.create({
      model: "gpt-oss-20b:free",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    let feedback = response.choices[0].message.content.trim();
    feedback = feedback.replace(/```/g, "").trim();

    res.json({ feedback });
  } catch (err) {
    console.error("Error generating feedback:", err);
    res.status(500).json({ error: "Failed to generate feedback" });
  }
};
