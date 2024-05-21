import { GoogleGenerativeAI } from"@google/generative-ai";
import express from 'express'

const app = express()
app.use(express.json());

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// For text-only input, use the gemini-pro model
const model = genAI.getGenerativeModel({ model: "gemini-pro"});

export async function  enhanceWithGemini(transcript) {
    const prompt =
     `
     Generate notes based on the following  ${transcript}:

[Transcript]

Instructions:
1. Please create concise notes summarizing the key points and highlights from the transcript.
2. Ensure that the generated notes are clear, coherent, and free from sensitive or inappropriate language.
3. Avoid using any special characters or syntax such as "*" as the notes will be stored in a PDF format.
4. If you encounter any errors or inappropriate content in the generated notes, please include a message indicating the issue along with the corrected text.

Thank you for your assistance!

     `
  
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    return text
  }
  
  
