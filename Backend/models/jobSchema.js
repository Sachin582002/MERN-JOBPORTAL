import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter job title"],
        minLength: [4, "Job title must contain at least 4 characters"],
        maxLength: [50, "Job title cannot exceed 50 characters"],
    },
    description: {
        type: String,
        required: [true, "Please enter job description"],
        minLength: [10, "Job description must contain at least 10 characters"],
        maxLength: [500, "Job description cannot exceed 500 characters"],
    },
    category: {
        type: String,
        required: [true, "Job category is required"],
    },
    country: {
        type: String,
        required: [true, "Job country is required"],
    },
    city: {
        type: String,
        required: [true, "Job city is required"],
    },
    location: {
        type: String,
        required: [true, "please provide exact location"],
        minLength: [50, "Job location must contain at least 50 characters"],
    },
    fixedSalary: {
        type: Number,
        minLength: [4, "fixed salary must contain at least 4 characters"],
        maxLength: [9, "fixed salary cannot exceed 9 characters"],
    },
    salaryFrom:{
        type: Number,
        minLength: [4, "salary from must contain at least 4 characters"],
        maxLength: [9, "salary from cannot exceed 9 characters"],
    },
    salaryTo: {
        type: Number,
        minLength: [4, "salary to must contain at least 4 characters"],
        maxLength: [9, "salary to cannot exceed 9 characters"],
    },
    expired:{
        type: Boolean,
        default: false,
    },
    jobPostedOn:{
        type: Date,
        default: Date.now(),
    },
    postedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
})

export const Job = mongoose.model("Job", jobSchema)