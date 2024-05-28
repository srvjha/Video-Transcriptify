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
    

[**Please note:** The following transcript may contain inappropriate language. If encountered, do your best to summarize the key points ethically and avoid including offensive content in the notes.

     Generate notes based on the following ${transcript}:
     
     ${transcript}
     
     **Instructions:**
     
     1. Please create concise notes summarizing the key points and highlights from the transcript.
     2. **In case of encountering inappropriate content, prioritize summarizing the key points ethically and omit any offensive language or themes.**
     3. Ensure that the generated notes are clear, coherent, and suitable for all audiences.
     4. Avoid using any special characters or syntax such as "*" as the notes will be stored in a PDF format.
     5. If the transcript includes any abuses for summarization then only, state this: "The provided transcript contains extensive inappropriate content that cannot be ethically summarized. Please consider providing a different transcript or editing the current one,
      but keep in mind that you have to provide notes so just remove inappropriate and provide clean notes"
     
     Thank you for your assistance!

     `
  
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    return text
  }
  
  
