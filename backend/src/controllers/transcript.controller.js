import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from '../utils/ApiError.js'
import { ApiResponse } from "../utils/ApiResponse.js"
import youtubedl from "youtube-dl-exec"
import { AssemblyAI } from 'assemblyai';
import { fileURLToPath } from 'url';
import path,{ dirname } from 'path';
import { uploadOnCloudnary } from "../utils/cloudinary.js";
import fs from 'fs'
import { enhanceWithGemini } from "../api/gemini.api.js";


const videoTranscript = asyncHandler(async (req, res) => {
    try{
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    
    const client = new AssemblyAI({
        apiKey: process.env.ASSEMBLY_API_KEY
    });

    const { videoUrl: url } = req.body;
    // Step 1: Get the video title
    const videoInfo = await youtubedl(url, {
        dumpSingleJson: true,
        cookies: path.resolve(__dirname, 'config', 'youtube-cookies.txt')
    });

    const videoTitle = videoInfo.title.replace(/[^\w\s]/gi, ''); // Clean video title
    const audioFileName = `${videoTitle.replace(/ /g, '-')}.mp3`; // Convert spaces to dashes
    const uploadsDir = path.resolve(__dirname, '../../', 'public', 'uploads');

    // Step 2: Ensure the uploads directory exists
    if (!await fs.promises.access(uploadsDir).catch(() => false)) {
        await fs.promises.mkdir(uploadsDir, { recursive: true });
        console.log(`Directory created at: ${uploadsDir}`);
    } else {
        console.log("File Directory Already Exists");
    }

    // Step 3: Define the path to save the downloaded audio
    const audioFilePath = path.resolve(uploadsDir, audioFileName);
    console.log(`Saving audio to: ${audioFilePath}`);

    // Step 4: Download audio and save it to the local folder

    try {
        await youtubedl(url, {
            extractAudio: true,
            audioFormat: 'mp3',
            output: audioFilePath,
        });
    } catch (error) {
        console.log("Error: ",error)
        throw new ApiError(400, `Audio File Not Found at: ${audioFilePath}`);
       
    }
   
    console.log("Success")

    // if (!await fs.promises.access(audioFilePath).catch(() => false)) {
    //     throw new ApiError(400, `Audio File Not Found at: ${audioFilePath}`);
    // }
    console.log(`Downloaded audio: ${audioFileName}`);

    // Step 5: Upload audio to Cloudinary
    const cloudinaryResponse = await uploadOnCloudnary(audioFilePath);
    const audioUrl = cloudinaryResponse.url;
    console.log(`Audio uploaded to Cloudinary at: ${audioUrl}`);

    // Step 6: Send to AssemblyAI for transcription
    const config = { audio_url: audioUrl };
    const transcriptResponse = await client.transcripts.transcribe(config);
    const transcriptId = transcriptResponse.id;

    // Step 7: Poll for the transcription result
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
    const pollInterval = setInterval(async () => {
        try {
            pollAttempts++;
            const text = await checkStatus(transcriptId);
            if (text) {
                clearInterval(pollInterval);
                const notesAI = await enhanceWithGemini(text)
                return res.status(201).json(new ApiResponse(201, { transcript: notesAI }));
            }
            if (pollAttempts >= 12) { // Timeout after 12 attempts (60 seconds)
                clearInterval(pollInterval);
                throw new ApiError(408, 'Transcription process timed out');
            }
        } catch (err) {
            clearInterval(pollInterval);
            next(err); // Pass error to the error handler
        }
    }, 1000); // Poll every 5 seconds
}
catch(error){
    console.log(error);
    throw new ApiError(400,`Error Occured ${error}`)
}
});


const checkMe = asyncHandler(async(req,res)=>{
    return res.status(201).json(
        new ApiResponse(200,"Its Working Here")
     )
})
export{
    videoTranscript,
    checkMe
}