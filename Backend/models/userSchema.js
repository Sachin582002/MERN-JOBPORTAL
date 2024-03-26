import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have more than 4 characters"]
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [8, "Password should be greater than 8 characters"],
        maxLength: [32, "Password cannot exceed 32 characters"],
         select: false // Hide this field when querying a document
    },
    phone: {
        type: Number,
        required: [true, "Please enter your phone number"],
    },
    role: {
        type: String,
        required: [true, "Please enter your role"],
        enum: ["job seeker", "Employer"], 
    },
    createAt:{
        type: Date,
        default: Date.now, 
    }
})

//hashing the password
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    } else {
        this.password = await bcrypt.hash(this.password, 10);
    }
})

//comparing password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

//generating JWT Token for authentication
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
    });
}

export const User = mongoose.model('User', userSchema)