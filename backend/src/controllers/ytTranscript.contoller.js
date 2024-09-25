import { YoutubeTranscript } from 'youtube-transcript';
import {enhanceWithGemini} from '../api/gemini.api.js'
import { getSubtitles } from 'youtube-captions-scraper';





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



export {generateTranscript}

