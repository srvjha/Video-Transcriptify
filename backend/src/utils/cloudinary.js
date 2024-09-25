import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudnary = async (audioUrl) => {
    try {
        if (!audioUrl) return null;
        
        // Upload the MP3 file (local or remote)
        const response = await cloudinary.uploader.upload(audioUrl, {
            resource_type: "video", // Cloudinary treats audio under the 'video' resource_type
            format: "mp3" // Ensure that the format is MP3
        });
        
        return response;
    } catch (error) {
        console.log("Error: ", error);
        throw new Error(`Cloudinary Upload Failed: ${error.message}`);
    }
};

export { uploadOnCloudnary };
