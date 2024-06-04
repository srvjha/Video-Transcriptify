import { User } from "../models/user.model.js";

export const warmUpServer = async () => {
    // Perform a dummy query to warm up the database connection
   const user =  await User.findOne({ email: 'vikas20@gmail.com' }).exec();
    console.log('Database connection warmed up.');
    console.log("USER: ",user)
    return user
};