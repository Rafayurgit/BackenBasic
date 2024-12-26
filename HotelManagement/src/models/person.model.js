import mongoose from "mongoose";

const personSchema= new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    username:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        unique:true,
    },
    age:{
        type:Number
    },
    worker:{
        type:String,
        require:true,
        enum:["chef", "waiter", "manager"]
    },
    mobile:{
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
