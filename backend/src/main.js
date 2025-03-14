import connectDB from './db/index.js'
import dotenv from 'dotenv'
import { app } from './app.js'


dotenv.config();

const port  = process.env.PORT || 8000
connectDB()
.then(()=>{
    app.listen(port, ()=>{
        console.log(`SERVER is running at PORT: ${process.env.PORT}`)
    })
    app.on("error",()=>{
        console.log("ERROR OCCURRED WHILE CONNECTION ",error)
    })
})
.catch((error)=>{
    console.log("MONGODB Connection Error. ",error)
})

