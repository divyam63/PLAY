import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.COUDINARY_API_KEY,
    api_secret: process.env.COUDINARY_API_SECRET
});

const uploadToCloudinary = async (filePath) => {
    try {
        if(!filePath){
            return null;
        }
        const result = await cloudinary.uploader.upload(filePath, {
            resource_type: "auto" //for video and image both
        });
        //delete the file from local storage after uploading to cloudinary
        fs.unlinkSync(filePath);
        return result.secure_url; //return the url of the uploaded file
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        throw error;
    }
}

