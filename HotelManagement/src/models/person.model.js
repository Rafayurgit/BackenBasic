import mongoose from "mongoose";

const personSchema= new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    age:{
        type:Number
    },
    worker:{
        type:String,
        require:true,
        enum:["chef", "waiter", "manager"]
    },
    monile:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    address:{
        type:String
    },
    slary:{
        type:Number,
        require:true
    }
})

export const Person= mongoose.model("Person", personSchema);
 
// module.exports =person;
