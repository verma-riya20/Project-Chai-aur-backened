import {asyncHandler} from '../utilis/asyncHandler.js';
import {ApiResponse} from '../utilis/ApiResponse.js';
import {ApiError} from '../utilis/ApiError.js';
import {User} from '../models/user.model.js';
import{uploadOnCloudinary} from '../utilis/cloudinary.js';
//to register a user
const registerUser=asyncHandler(async(req,res)=>{
   //get user details from frontend
   //validation- not empty
   //check if user name already exits- username and email
   //check for images and avatars
   //upload them to cloudinary
   //create user object, create user entry in db
   //remove password and refresh token from the responce
   //return res(
});
   const changeCurrentUser=asyncHandler(async(req,res)=>{
    const {oldPassword,newPassword}=req.body;
    const user=await User.findById(req.user?._id);
    const isPasswordCorrect=await user.isPasswordCorrect(oldPassword);
    if(!isPasswordCorrect){
        return res.status(400).json({message:"Invalid password"});
    }
    user.password=newPassword;
    await user.save({validateBeforeSave: false});
    return res.status(200).json(new ApiResponse(200,"Password changed successfully"));

   })

// get current user
const getCurrentUser=asyncHandler(async(req,res)=>{
    return res.status(200).
    json(200,req.user,"User details fetched successfully");
})

//update details
const updateUserDetails=asyncHandler(async(req,res)=>{
    const {fullName,email}=req.body;
    if(!fullName ||!email){
        throw new ApiError(400,"Full name and email are required");
    }
    const user=await User.findByIdAndUpdate(req.user?._id,
        {$set:{fullName,email}},
        {new:true})
    .select("-pasword");
    return res
    .status(200)
    .json(200,user,"User details updated successfully");
})
//update avatar
const updateAvatar=asyncHandler(async(req,res)=>{
    const avatarlocalpath=req.file.path;
    if(!avatarlocalpath){
        throw new ApiError(400,"Avatar image is required");
    }
    const avatar=await uploadOnCloudinary(avatarlocalpath);
    if(!avatar.url){
        throw new ApiError(500,"Error uploading avatar image");
    }
    const user=await User.findByIdAndUpdate(req.user?._id,
        {
            $set:{avatar:avatar.url}
        },
        {new:true}
    )
    return res
    .status(200)
    .json(200,user,"Avatar Updated successfully");
})
//update CoverImage
const coverImage=asyncHandler(async(req,res)=>{
    const coverImageLocalPath=req.file.path;
    if(!coverImageLocalPath){
        throw new ApiError("Cover Image is required")

    }
    const coverImage=await uploadOnCloudinary(coverImageLocalPath)
    if(!coverImage.url){
        throw new ApiError("Error uploading cover image")

    }
    const user=await User.findByIdAndUpdate(req.user?._id,
        {
            $set:{coverImage:coverImage.url}
        },
        {new:true}
    )
    return res.
    status(200)
    .json(200,user,"Cover image uploaded successfully")
})


export {
    registerUser,
    changeCurrentUser,
    getCurrentUser,
    updateUserDetails,
    updateAvatar
}