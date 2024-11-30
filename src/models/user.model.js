import mongoose,{Schema} from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
const UserSchema=new Schema({
    id:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true,
    },
    fullName:{
        type:String,
        required:true,
        trim:true,
        index:true,
    },
    avatar:{
        type:String, //cloudinary
        required:true,
    },
    coverImage:{
         type:String,  //cloudinary
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        unique:true,
    },
    watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref:"Videos"
        }
    ],
    refreshTokens:{
        type:String,
    }
},{
    timestamps:true
})
UserSchema.pre("save",async function(next){
    if(!this.isModified("password")) next();
    this.password=bcrypt.hash(this.password, 10)
    next();
})
UserSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}
//jwt
UserSchema.methods.generateAccessToken=function(){
    return jwt.sign({
        _id:this._id,
        email:this.email,
        fullName:this.fullName,
        username:this.username
    },
    process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
  )
}

UserSchema.methods.generateRefreshToken=function(){
    return jwt.sign({
        _id:this._id,
        
    },
    process.env.REFRESH_TOKEN_SECRET,{
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
  )
}
export const User=new mongoose.model("User",UserSchema)