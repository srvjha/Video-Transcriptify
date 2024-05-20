import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import ytdl from "ytdl-core"
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

app.get('/api/v1/users/download', async (req, res) => {
    try {
        const url = req.query.url
        const videoId = await ytdl.getURLVideoID(url)
        const metaInfo = await ytdl.getInfo(url)
        let data = {
            url: 'https://www.youtube.com/embed/'+videoId,
            info: metaInfo.formats
        }
        return res.send(data)
    } catch(error) {
        return res.status(500)
    }
})

app.get('/api/v1/users/transcript', async (req, res) => {
    try {
      const url = req.query.url;
      const rawTranscript = await YoutubeTranscript.fetchTranscript(url);
      console.log("Raw Transcript ",rawTranscript)
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