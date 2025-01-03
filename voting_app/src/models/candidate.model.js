import mongoose from "mongoose";
import { User } from "./user.model";

const candidateSchema= new mongoose.Schema({
    name:{
        type:String,
    },
    age:{
        type:Number,
        required:true,
    },
    party:{
        type:String,
        required:true,
    },
    votes:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User"
            },
            votedAt:{
                type:Date,
                default:Date.now
            }
        }
    ],
    voteCount:{
        type:Number,
        default:0
    }
})


export const Candidate= mongoose.model("Candidate", candidateSchema)