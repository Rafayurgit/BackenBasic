import mongoose from "mongoose";
import bcrypt from "bcrypt";


const userSchema= new mongoose.Schema({
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

personSchema.pre("save", async function(next){
    const person=this;

    if(!person.isModified("password")) return next();

    try {
        const salt =await bcrypt.genSalt(10);
        const hashPassword= await bcrypt.hash(person.password, salt);
        person.password=hashPassword;
        next();
    } catch (error) {
        return next(error);
    }
})

personSchema.methods.comparePassword = async function(candidatePassword){
    try {
        const isMatch= await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
}

export const User= mongoose.model("User", userSchema);