import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser';


const app =express();
/* 
change the Origin Url as per the development/production
Developement(For my useCase):- http://localhost:5173
Production:- https://video-transcriptify.vercel.app/
*/
app.use(cors({    
    origin:"https://video-transcriptify.vercel.app",
    credentials:true
}))
// app.use() is used to mount the CORS middleware globally to the Express application. It specifies the CORS configuration options, including the allowed origin (retrieved from the environment variable CORS_ORIGIN) and whether credentials (such as cookies) should be allowed in cross-origin requests.

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static( 'public'));
app.use(cookieParser())
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send("Everything is fine !!!")
})



// Router
import userRouter from "./routes/user.routes.js"
import transcript from "./routes/transcript.routes.js"
import { errorHandler } from './middlewares/error.middleware.js';

app.use("/api/v1/users",userRouter)
app.use("/api/v1/video",transcript)
app.use(errorHandler)

export{app}