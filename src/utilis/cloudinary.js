import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'


// Configuration
    cloudinary.config({ 
        cloud_name:process.env.CLOUDINARY_CLOUD_NAME , 
        api_key:process.env.CLOUDINARY_API_KEY , 
        api_secret:process.env.CLOUDINARY_API_SECRET         // Click 'View API Keys' above to copy your API secret
    });

    const uploadfile=async(localfile)=>{
         try {
            if(!localfile) return null;
            const response=await cloudinary.uploader.upload(localfile,{
                resource_type:'auto'
            })
         } catch (error) {
            console.log(error)
         }
         console.log("Successfully uploaded")
         console.log(response)
    }