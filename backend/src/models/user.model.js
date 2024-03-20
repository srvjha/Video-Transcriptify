import mongoose,{Schema} from 'mongoose'
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema(
{
    fullName:{
        type:String,
        required:true,
        trim:true,
        index:true
    },
    email:{
         type:String,
         required:true,
         lowercase:true,
         trim:true,
         unique:true
    },
    password:{
        type:String,
        required:[true,"Password is Required"],
        
    },
    refreshToken:{
        type:String
      }
},{timestamps:true})

/*
yaha use krenge mongoose ke hooks like pre hook ka jo hum use kr skte hai
 jb koi data save hone wala ho uss just phele koi function perform krna ho
 yaha hum apne password ko encrypt krnege pre hook ke help se
 */

 userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next(); // hr field ke liye change na kre isliye yeh conditon lagayi
    this.password = bcrypt.hash(this.password,8)
    console.log("PASSWORD HASH: ",this.password)
    return next();
 })

 // ab iske baad hum compare krke check bhi kr na padega ki password same hai ki nhi
 // isliye apna method khud banayegene

 userSchema.methods.isPasswordCorrect = async function(password)
 {
    return await bcrypt.compare(password,this.password)
 }

 // JWT ek bearer token hai mtlb jo mujhe yeh token dedega usse mein data de dunga key ki trha hai yeh
 userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            fullName:this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
 }
 userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id:this._id,
           
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
 }

export const User = mongoose.model("User",userSchema)