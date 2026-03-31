import mongoose,{Schema} from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index:true      //for faster search in database(optimized)
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullName:{
        type: String,
        required: true,
        trim: true,    
    },
    avtar:{
        type: String,  //cloudinary url for image
        required: false,
    },
    coverImage:{
        type: String,  //cloudinary url for image
        required: false,
    },
    watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref:"Video"
            
        }
    ],

    password: {
        type: String,
        required: [true,"Password is required"],
        minlength: [8,"Password must be at least 8 characters long"],
    },
    refreshToken:{
        type: String,
        
    }
},{
    timestamps:true
});
// just before saving the user to database we will hash the password if it is modified 
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){   
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//costum method to compare password in login controller
//bcrypt.compare() method will compare the plain text password with the hashed password stored in database and return true or false
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}

//assess token generation method
userSchema.methods.generateAccessToken = function(){
    return jwt.sign({id:this._id,
        username:this.username,
        email:this.email,
        fullName:this.fullName,
    }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIRATION});
}

//refresh token generation method
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {id:this._id}
        , process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: process.env.REFRESH_TOKEN_EXPIRATION}
        );
}

export default mongoose.model("User",userSchema);   
    
           