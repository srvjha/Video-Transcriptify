import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from '../utils/ApiError.js'
import { User } from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"


const registerUser = asyncHandler(async (req,res)=>{
  //Logic for my registerUser
  // check user data from frontend
  // check that all field should not be empty
  // check if user already exists (email)
  // create user object to send in mongodb
  // remove user password and refresh token from response
  //check for user creation
  // return res

  const{fullName,email,password,username} =  req.body
  console.log("FullName: ",fullName)
  console.log("Email: ",email)
  console.log("REQUESTED BODY: ",req.body)

  // check for user data validation
  if(
    [fullName,email,passwordmusername].some((field)=>field?.trim()==="")
  )
  {
    throw new ApiError(400,"All Fields are required 🤬!.")
  }

  // now checking email and password validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if(!emailRegex.test(email))
  {
     throw new ApiError(400,"Email Should be Valid 😤")
  }

  
  if (!passwordRegex.test(password))
    {
    throw new ApiError(400, "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character such as @$!%*?&. 😤");
   }

   // Check if user is already existed
  const existedUser =  User.findOne({
    $or:[{username},{email}]
   })
   if(existedUser)
   {
    throw new ApiError(409,"User Already Existed")
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

export {registerUser}