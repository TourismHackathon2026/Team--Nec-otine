import { GoogleGenAI } from "@google/genai";
import express from 'express';
const router = express.Router();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

router.post('/generate-itinerary', async (req, res) => {
  const { destination, days, budget, interests } = req.body;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // Best model for fast, cheap hackathon generation
      contents: `Plan a ${days}-day trip to ${destination} for a budget of ${budget}. Interests: ${interests}.`,
      config: {
        // Enforce a strict JSON output shape
        responseMimeType: "application/json",
        systemInstruction: "You are an expert travel planner. Return a JSON array of days. Each day object must contain a 'dayNumber' integer, 'theme' string, and an 'activities' array of objects containing 'time', 'title', 'description', and 'estimatedCost'. Do not wrap the response in markdown blocks.",
      }
    });

    res.json(JSON.parse(response.text));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
