import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs'
import { ApiError } from './ApiError.js';

          
cloudinary.config({ 
    cloud_name: 'sauravjha', 
    api_key: '813434626398834', 
    api_secret: 'Y2Qyznq4fy0QW3LGnAlRNmJY6oc' 
});

const uploadOnCloudnary = async(localFilePath)=>{
    try {
        if(!localFilePath) return null
        // upload file on cloudnary
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        // file has been uploded successfully
        console.log("File is Uploaded Succesfully on CLoudnary!!!",response.url);
        fs.unlinkSync(localFilePath)
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        
    }
}

const deleteOnCloudnary  = async(localFileURL)=>{
    const public_id = localFileURL.slice(localFileURL.lastIndexOf("/") + 1, localFileURL.lastIndexOf(".png"));
   
    try {
        if(!public_id) return null
        // delete file 
        console.log("Public ID:",public_id)
        const response  = await cloudinary.uploader.destroy(public_id)
        console.log("File is Successfully Deleted",response)
        return response
        
    } catch (error) {
        throw new ApiError(400,"File not Deleted.")
    }
}




export {uploadOnCloudnary,deleteOnCloudnary}