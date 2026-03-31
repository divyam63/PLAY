import mongoose,{Schema} from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'; //for pagination in video listing
const videoSchema =new Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        required: true,
        trim: true
    },
    duration:{
        type: Number,  //cloudinary job se video upload karenge to hume duration milega usko store karne ke liye
        required: true
    },
    videoFile:{
        type: String,  //cloudinary url
        required: true
    },
    thumbnail:{
        type: String,  //cloudinary url
        required: true
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    isPublic:{
        type: Boolean,
        default: true
    },


},{
    timestamps:true
});

videoSchema.plugin(mongooseAggregatePaginate); //for pagination in video listing
//aggregation pipeline

export default mongoose.model("Video",videoSchema);