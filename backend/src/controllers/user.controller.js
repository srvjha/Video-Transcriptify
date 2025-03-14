import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from '../utils/ApiError.js'
import { User } from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from 'jsonwebtoken'


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
//   console.log("FullName: ",fullName)
//   console.log("Email: ",email)
//   console.log("REQUESTED BODY: ",req.body)

   // check for user data validation
  if([fullName,username,email,password].some((field)=>field?.trim()===""))
  {
    throw new ApiError(400,"All Fields are required 😤!.")
  }
  
   // Check if user is already existed
   const existedUser = await User.findOne({
    $or:[{username},{email}]
   })
   //console.log("EXISTED USER: ",existedUser)
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
     //console.log("USER ",user)

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
      secure:true,
      sameSite: "None", // Allows cookies to be sent in cross-origin requests
      maxAge: 24 * 60 * 60 * 1000, // 5 day
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
         secure:true,
         sameSite: "None", // Allows cookies to be sent in cross-origin requests
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
  console.log("incomingRT: ",incomingRefreshToken)
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
   console.log("user: ",user)
   if(incomingRefreshToken!==user?.refreshToken)
   {
    throw new ApiError(401,"Refresh Token Expired or Used!")
   }
 
   const options = {
    httpOnly:true,
    secure:true,
    sameSite: "None",
    maxAge:  3 * 24 * 60 * 60 * 1000
   }
 
   const{accessToken,refreshToken:newRefreshToken}= await generateAccessAndRefreshTokens(user._id)
 
   return res
   .status(200)
   .cookie("accessToken",accessToken,options)
   .cookie("refreshToken",newRefreshToken,options)
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
  // console.log({user})
   res.status(200).json(new ApiResponse(200,user,"User Details Fetched SuccessFully"))
})


export {registerUser,loginUser,logoutUser,refreshAccessToken,getCurrentUser}