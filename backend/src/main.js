import connectDB from './db/index.js'
import dotenv from 'dotenv'
import { app } from './app.js'
import { warmUpServer } from './utils/warmUp.js'

dotenv.config({
    path:'./.env'
})
// connectDB()
// .then(()=>{
//     app.listen(process.env.PORT || 8000 , ()=>{
//         console.log(`SERVER is running at PORT:- ${process.env.PORT}`)
//     })
//     app.on("error",()=>{
//         console.log("ERROR OCCURRED WHILE CONNECTION ",error)
//     })
// })
// .catch((error)=>{
//     console.log("MONGODB Connection Error. ",error)
// })

connectDB()
    .then(() => {
        warmUpServer().then(() => {
            console.log('Server warmed up.');
            app.listen(process.env.PORT || 8000, () => {
                console.log(`SERVER is running at PORT:- ${process.env.PORT}`);
            });
        }).catch(err => {
            console.error('Error during warm-up:', err);
        });
    })
    .catch((error) => {
        console.log("MONGODB Connection Error. ", error);
    });