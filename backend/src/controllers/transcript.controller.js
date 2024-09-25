import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from "../utils/ApiResponse.js";
import youtubedl from "youtube-dl-exec";
import { AssemblyAI } from 'assemblyai';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { uploadOnCloudnary } from "../utils/cloudinary.js";
import fs from 'fs';
import { enhanceWithGemini } from "../api/gemini.api.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uploadsDir = path.join(__dirname, '../../public/uploads'); // Assuming your file structure
console.log("UploadDir: ", uploadsDir);

const videoTranscript = asyncHandler(async (req, res, next) => {
    try {
        const client = new AssemblyAI({
            apiKey: process.env.ASSEMBLY_API_KEY
        });

        const { videoUrl: url } = req.body;

        // Step 1: Get the video title
        const videoInfo = await youtubedl(url, {
            dumpSingleJson: true,
            cookies: path.resolve(__dirname, '../../config/youtube-cookies.txt')
        });

        const videoTitle = videoInfo.title.replace(/[^\w\s]/gi, ''); // Clean video title
        const audioFileName = `${videoTitle.replace(/ /g, '-')}.mp3`; // Convert spaces to dashes

        // Step 2: Download audio and upload it directly to Cloudinary
        let audioUrl;

        try {
            await youtubedl(url, {
                extractAudio: true,
                audioFormat: 'mp3',
                output: audioFileName,
            });

            console.log(`Downloaded audio: ${audioFileName}`);

            const cloudinaryResponse = await uploadOnCloudnary(audioFileName);
            audioUrl = cloudinaryResponse.url;
            console.log(`Audio uploaded to Cloudinary at: ${audioUrl}`);
        } catch (error) {
            console.error("Error downloading or uploading audio:", error);
            throw new ApiError(400, `Error: ${error.message}`);
        }

        // Step 3: Send to AssemblyAI for transcription
        const config = { audio_url: audioUrl };
        const transcriptResponse = await client.transcripts.transcribe(config);
        const transcriptId = transcriptResponse.id;

        // Step 4: Poll for the transcription result
        const checkStatus = async (id) => {
            const result = await client.transcripts.get(id);
            if (result.status === 'completed') {
                return result.text;
            } else if (result.status === 'failed') {
                throw new ApiError(500, 'Transcription failed');
            }
            return null; // Still processing
        };

        let pollAttempts = 0;
        let responseSent = false;  // Prevent multiple responses
        const pollInterval = setInterval(async () => {
            try {
                pollAttempts++;
                const text = await checkStatus(transcriptId);
                if (text && !responseSent) {  // Check if a response is already sent
                    responseSent = true;  // Mark response as sent
                    clearInterval(pollInterval);  // Stop polling

                    const notesAI = await enhanceWithGemini(text);
                    return res.status(201).json(new ApiResponse(201, { transcript: notesAI }));
                }

                if (pollAttempts >= 12 && !responseSent) {  // Timeout after 12 attempts (60 seconds)
                    responseSent = true;  // Mark response as sent
                    clearInterval(pollInterval);  // Stop polling

                    throw new ApiError(408, 'Transcription process timed out');
                }
            } catch (err) {
                if (!responseSent) {  // Check if a response is already sent
                    responseSent = true;  // Mark response as sent
                    clearInterval(pollInterval);  // Stop polling
                    return next(err);  // Pass error to the error handler
                }
            }
        }, 1000);  // Poll every second

    } catch (error) {
        if (!res.headersSent) {  // Ensure response hasn't already been sent
            return next(error);  // Pass error to next middleware
        }
    }
});


const checkMe = asyncHandler(async (req, res) => {
    return res.status(201).json(
        new ApiResponse(200, "It's Working Here")
    );
});

export {
    videoTranscript,
    checkMe
};
