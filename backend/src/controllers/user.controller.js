import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from '../utils/ApiError.js'
import { User } from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from 'jsonwebtoken'
import youtubedl from "youtube-dl-exec"
import { AssemblyAI } from 'assemblyai';
import { fileURLToPath } from 'url';
import path,{ dirname } from 'path';
import { uploadOnCloudnary } from "../utils/cloudinary.js";
import fs from 'fs'
import { enhanceWithGemini } from "../api/gemini.api.js";



const videoTranscript = asyncHandler(async (req, res) => {
   const __filename = fileURLToPath(import.meta.url);
   const __dirname = dirname(__filename);
   
   const client = new AssemblyAI({
       apiKey: process.env.ASSEMBLY_API_KEY
   });

   const { videoUrl: url } = req.body;
   // Step 1: Get the video title
   const videoInfo = await youtubedl(url, {
       dumpSingleJson: true,
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
});

const generateAccessAndRefreshTokens = async(userId)=>
{
   try {
      const user =  await User.findById(userId)
      const accessToken =  user.generateAccessToken()
      const refreshToken =  user.generateRefreshToken()


      user.refreshToken = refreshToken
      await user.save({validateBeforeSave:false}) // mtlb koi validation mt krna 

      return {accessToken,refreshToken}

   } catch (error) {
      throw new ApiError(500,"Something Went Wrong While Generating Token.")
   }
}

const registerUser = asyncHandler(async (req,res)=>{
  //Logic for my registerUser
  // check user data from frontend
  // check that all field should not be empty
  // check if user already exists (email)
  // create user object to send in mongodb
  // remove user password and refresh token from response
  //check for user creation
  // return res

  const{fullName,username,email,password} =  req.body
  console.log("FullName: ",fullName)
  console.log("Email: ",email)
  console.log("REQUESTED BODY: ",req.body)

   // check for user data validation
  if([fullName,username,email,password].some((field)=>field?.trim()===""))
  {
    throw new ApiError(400,"All Fields are required 😤!.")
  }
  
   // Check if user is already existed
   const existedUser = await User.findOne({
    $or:[{username},{email}]
   })
   console.log("EXISTED USER: ",existedUser)
   if(existedUser)
   {
    throw new ApiError(409,"User Already Existed!")
   }

    // now create user
      const user = await User.create({
      fullName,
      email,
      password,
      username:username.toLowerCase()
     })
  
       const createdUser =  await User.findById(user._id).select(
          "-password -refreshToken"
       )
  
       if(!createdUser)
       {
          throw new ApiError(500,"Something went wrong while registering the user!")
       }
  
       return res.status(201).json(
          new ApiResponse(200,createdUser,"USER REGISTERED SUCCESSFULLY!")
       )
})

const loginUser = asyncHandler(async(req,res)=>{
   // Logic for Register
   // get data
   // check User already Exist
   // password check
   // generate token(Access and refresh)
   // send cookie

   const {email,password} = req.body
   if(!email)
   {
      throw new ApiError(400,"Email is Required!")
   }

     const user=  await User.findOne({email})
     console.log("USER ",user)

     if(!user)
     {
      throw new ApiError(404,"USER NOT REGISTERED.")
     }
  

    
    const isPasswordValid =  await user.isPasswordCorrect(password)

    if(!isPasswordValid)
    {
      throw new ApiError(401,"INVALID USER CREDENTAILS.")
    }

      const{refreshToken,accessToken} =  await  generateAccessAndRefreshTokens(user?._id)
      //console.log("ACCESS TOKEN: ",accessToken)
      //console.log("REFRESH TOKEN: ",refreshToken)
      const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
      //console.log("LOGGED USER :",loggedInUser)

     //Cookies
     const options = { // --> yeh krne se cookies sirf server se modify ho skta hai warna yeh beDfault modify bhi hota hai frontend pe
      httpOnly:true,
      secure:true
     }

     return res
     .status(200)
     .cookie("accessToken",accessToken,options)
     .cookie("refreshToken",refreshToken,options)
     .json(
         new ApiResponse(
            200,
            {
               user:loggedInUser,accessToken,refreshToken
            },
            "USER LOGGED IN SUCCESSFULLY."
         )
     )

})

const logoutUser = asyncHandler(async(req,res)=>{
     //console.log("Requested middleware :",req.userLogoutMiddleware)
     //console.log("Requesetd ID : ", req.userLogoutMiddleware?._id)
     const save =  await User.findByIdAndUpdate(
      req.userLogoutMiddleware?._id,
      {
         $unset:{
            refreshToken:1
         }
      },
      {
         new:true
      }
    )
    //console.log("SAVE :",save)
      await User.findByIdAndUpdate(
         req.userLogoutMiddleware?._id,
         {
            $set:{
               refreshToken:undefined
            }
         },
         {
            new:true
         }
       )

       const options = { 
         httpOnly:true,
         secure:true
        }

        return res
        .status(200)
        .clearCookie("accessToken",options)
        .clearCookie("refreshToken",options)
        .json(
         new ApiResponse(
            200,
            {},
            "USER LOGOUT SUCCESSFULLY!"
         )
        )
})

const refreshAccessToken  = asyncHandler(async(req,res)=>{
  const incomingRefreshToken =  req.cookies.refreshToken || req.body.refreshToken
  if(!incomingRefreshToken)
  {
   throw new ApiError(401,"Unauthorized Request")
  }

  try {
   const decodedToken = jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET)
 
   const user = await User.findById(decodedToken?._id)
   if(!user)
   {
    throw new ApiError(401,"Invalid Refresh Token!")
   }
 
   if(incomingRefreshToken!==user?.refreshToken)
   {
    throw new ApiError(401,"Refresh Token Expired or Used!")
   }
 
   const options = {
    httpOnly:true,
    secure:true
   }
 
   const{accessToken,newRefreshToken}= await generateAccessAndRefreshTokens(user._id)
 
   return res
   .status(200)
   .cookies("accessToken",accessToken,options)
   .cookies("refreshToken",newRefreshToken,options)
   .json(
       new ApiResponse(
          200,
          {accessToken,refreshToken:newRefreshToken},
          "Access Token Refreshed Successfully"
          )
   )
  } catch (error) {
      throw new ApiError(401,error?.message ||"Invalid Refresh Token" )
  }
})

const getCurrentUser = asyncHandler(async(req,res)=>{
   const user = req.userLogoutMiddleware
   res.status(200).json(new ApiResponse(200,user,"User Details Fetched SuccessFully"))
})

const healthCare = asyncHandler(async(req,res)=>{
  
      res.status(200).send('Server is up and running');
  
})
export {registerUser,loginUser,logoutUser,refreshAccessToken,getCurrentUser,healthCare,videoTranscript}