import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const VideoSchema=new Schema({
    videoFile:{
        type:String,  //cloudinary
        required:true,
    },
    thumbnail:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    duration:{
        type:Number,
        required:true,
    },
    views:{
        type:Number,
        required:true,
    },
     owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},{
    timestamps:true,
})
VideoSchema.plugin(mongooseAggregatePaginate)
export const Video=new mongoose.model("Video",VideoSchema)