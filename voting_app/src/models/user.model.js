import mongoose from "mongoose";

const userSchema= new Mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true
    },
    mobile:{
        type:Number,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    adharCard:{
        type:Number,
        required:true,
        unique:true
    },
    role:{
        type:String,
        enum:["admin", "voter"],
        default:"voter",
    },
    isVoted:{
        type:Boolean,
        default:false
    }
})

export const User= mongoose.model("User", userSchema);