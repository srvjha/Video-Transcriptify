import { GoogleGenerativeAI } from"@google/generative-ai";
import express from 'express'

const app = express()
app.use(express.json());

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// For text-only input, use the gemini-pro model
const model = genAI.getGenerativeModel({ model: "gemini-pro"});

export async function  enhanceWithGemini(transcript) {
    const prompt = `Make notes of these raw text ${transcript} and please dont use any * as it is stored 
    in pdf so there this syntax sugar wont work just plain normal text`
  
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    return text
  }
  
  