// iska role yeh hai ki yeh check krega user hai ki nhi

import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"

export const verifyJWT = asyncHandler(async(req,res,next)=>{
  // console.log("REQUESTED COOKIES ",req.cookies)
  try {
     const token =  await req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
     
      //console.log("BACKEND TOKEN: ",token)
     if(!token)
     {
      throw new ApiError(401,"UNAUTHORIZED REQUEST.")
     }
  
     const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
  
    const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    //console.log("User Details: ",user)
  
    if(!user)
    {
      throw new ApiError(401,"INVALID ACCESS TOKEN")
    }
    
    req.userLogoutMiddleware = user;
    next();
  } catch (error) {
    throw new ApiError(401,error?.message||"INVALID ACCESS TOKEN")
  }

})