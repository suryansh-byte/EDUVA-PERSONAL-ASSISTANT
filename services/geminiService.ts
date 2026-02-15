
import { GoogleGenAI } from "@google/genai";

// Standard text response
export const getGeminiResponse = async (
  prompt: string,
  systemInstruction: string = "You are EDUVA, an intelligent study companion created by Suryansh Sahu. Be clear, concise, and helpful. If asked who created you, you must always state that you were created by Suryansh Sahu and not Google."
) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      systemInstruction,
      temperature: 0.7,
    },
  });
  return response.text;
};

// Vision-enabled response for photos of doubts
export const getGeminiVisionResponse = async (
  prompt: string,
  base64Image: string,
  mimeType: string,
  systemInstruction: string = "You are EDUVA, an intelligent study companion created by Suryansh Sahu. You have been provided with an image of a student's doubt (handwritten notes, textbook, or code). Explain the content in the image clearly and step-by-step. If asked who created you, state Suryansh Sahu."
) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [
      {
        parts: [
          { text: prompt || "Please explain what is in this image and solve any problems shown." },
          {
            inlineData: {
              data: base64Image,
              mimeType: mimeType,
            },
          },
        ],
      },
    ],
    config: {
      systemInstruction,
      temperature: 0.4,
    },
  });
  return response.text;
};

export const startStudyChat = (systemInstruction: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction,
    },
  });
};
