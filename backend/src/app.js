import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import ytdl from "ytdl-core"
import youtubedl from "youtube-dl-exec"
import { YoutubeTranscript } from 'youtube-transcript';
import {enhanceWithGemini} from './api/gemini.api.js'



const app =express();
app.use(cors({    
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
// app.use() is used to mount the CORS middleware globally to the Express application. It specifies the CORS configuration options, including the allowed origin (retrieved from the environment variable CORS_ORIGIN) and whether credentials (such as cookies) should be allowed in cross-origin requests.

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

app.get('/',(req,res)=>{
    res.send("Everything is fine !!!")
})

// Using ytdl-core but now it is not working

// app.get('/api/v1/users/download', async (req, res) => {
//     try {
//         const url = req.query.url;
//         const videoId = await ytdl.getURLVideoID(url);
//         const metaInfo = await ytdl.getInfo(url);
//         const format = ytdl.chooseFormat(metaInfo.formats, { quality: 'highest' });
        
//         if (!format || !format.url) {
//             return res.status(400).send("No suitable format found for download.");
//         }
        
//         let data = {
//             url: 'https://www.youtube.com/embed/' + videoId,
//             info: metaInfo.formats,
//             download: format.url // Include the download URL
//         };
        
//         return res.send(data);
//     } catch (error) {
//         console.error('Error:', error);
//         return res.status(500).send('Internal Server Error');
//     }
// });

// Using youtube-dl

app.get('/api/v1/users/download', async (req, res) => {
    try {
      const url = req.query.url;
  
      const info = await youtubedl(url, {
        dumpSingleJson: true,
        noWarnings: true,
        noCallHome: true,
        noCheckCertificate: true,
        preferFreeFormats: true,
        youtubeSkipDashManifest: true
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

app.get('/api/v1/users/transcript', async (req, res) => {
    try {
      const url = req.query.url;
      const rawTranscript = await YoutubeTranscript.fetchTranscript(url);
      //console.log("Raw Transcript ",rawTranscript)
      let collectData = ""
      rawTranscript.forEach((data)=>{
          collectData+=data.text
      })
      console.log("Data: ",collectData)
      const transcript = await enhanceWithGemini(collectData)
      
      console.log("Transcript: ",transcript)

  
      return res.json({ transcript });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Router
import userRouter from "./routes/user.routes.js"
import { errorHandler } from './middlewares/error.middleware.js';
app.use("/api/v1/users",userRouter)
app.use(errorHandler)

export{app}