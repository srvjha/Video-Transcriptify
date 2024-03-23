import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

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

// Router
import userRouter from "./routes/user.routes.js"
app.use("/api/v1/users",userRouter)


export{app}