import { YoutubeTranscript } from 'youtube-transcript';
import {enhanceWithGemini} from '../api/gemini.api.js'
import { getSubtitles } from 'youtube-captions-scraper';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import youtubedl from "youtube-dl-exec"



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);





// Controller function to handle YouTube transcript generation
const generateTranscript = async (req, res) => {
    try {
        const { url } = req.body; // Get the YouTube URL from the request body
        
        // Extract the YouTube video ID from the URL
        const videoId = extractVideoId(url);
        if (!videoId) {
            return res.status(400).json({ message: "Invalid YouTube URL" });
        }

        // Fetch the transcript for the video
        //const transcript = await YoutubeTranscript.fetchTranscript(videoId);
        const transcript = await getSubtitles({videoID:videoId,lang:"en"});
        //console.log({transcript})

        if (!transcript || transcript.length === 0) {
            return res.status(404).json({ message: "Transcript not available for this video" });
        }
       //console.log({transcript})
        //  Now will select all the text from transcript together
        let text = [];
        transcript.forEach((item) => {
            text.push(item.text);
        });
        //console.log({text})
        //  Now will join all the text together
        const fullTranscript = text.join(' ');
        //console.log({fullTranscript})

        // Now with the help of AI will make notes out of it
        let prompt = `Based on the following content: ${fullTranscript}, generate a summary and key points in a well-organized and professional manner. Ensure the output is structured clearly, remove any unnecessary symbols like *, and present the information concisely and formally without repeating the text exactly. Focus on summarizing the key ideas.`

        const noteFromAI = await enhanceWithGemini(prompt);
        return res.json(noteFromAI);
        

       
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while generating the transcript" });
    }
};

// Function to extract the YouTube video ID from the URL
const extractVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|\/u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
};


// This is currenlty working
const giveNotes = asyncHandler(async(req,res)=>{
    try {
        const url = req.body.url;
        const prompt = `Generate Notes from this youtube video ${url}`
        const notes =  await enhanceWithGemini(prompt);
        return res.json(notes);
        
    } catch (error) {
        console.error(error);
        throw new ApiError(400,"Notes not generated")
    }
})


// for downloading
const downloadVideo = asyncHandler(async (req, res) => {
    try {
      const url = req.query.url;
  
      const info = await youtubedl(url, {
        dumpSingleJson: true,
        noWarnings: true,
        noCallHome: true,
        noCheckCertificate: true,
        preferFreeFormats: true,
        youtubeSkipDashManifest: true,
        cookies: path.resolve(__dirname, '../../config/youtube-cookies.txt')
      });
  
      // Filter and reduce to unique resolutions, include audio formats
      const formats = info.formats
        .filter(format => format.vcodec !== "none" || format.acodec !== "none") // Include both video and audio formats
        .reduce((acc, format) => {
          const isVideo = format.vcodec !== "none";
          if (isVideo && format.height < 144) return acc; // Skip low resolution videos
  
          const key = isVideo ? format.height : `audio-${format.acodec}`;
          if (!acc.some(f => (f.height === key || (f.isAudio && f.acodec === format.acodec)))) {
            acc.push({
              mimeType: format.ext === 'webm' ? `video/webm; codecs="${format.acodec}, ${format.vcodec}"` : `video/mp4; codecs="${format.acodec}, ${format.vcodec}"`,
              hasVideo: isVideo,
              height: isVideo ? format.height : null,
              isAudio: !isVideo,
              acodec: !isVideo ? format.acodec : null,
              url: format.url,
            });
          }
          return acc;
        }, []);
  
      const data = {
        url: `https://www.youtube.com/embed/${info.id}`,
        info: formats
      };
  
      res.send(data);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  });


export {generateTranscript,giveNotes,downloadVideo}

