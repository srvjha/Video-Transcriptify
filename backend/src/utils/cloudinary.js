import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudnary = async (audioStream) => {
    try {
        if (!audioStream) return null;

        const uploadStream = () => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { resource_type: "video", format: "mp3" }, // Audio is uploaded as 'video' resource type
                    (error, result) => {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    }
                );
                audioStream.stdout.pipe(stream); // Piping the youtube-dl audio stream
            });
        };

        const response = await uploadStream();
        return response;
    } catch (error) {
        console.log("Error: ", error);
        throw new Error(`Cloudinary Upload Failed: ${error.message}`);
    }
};

export { uploadOnCloudnary };
