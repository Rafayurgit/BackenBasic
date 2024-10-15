import mongoose from 'mongoose';

const patientSchema= mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        reuired:true
    },
    bloodGrou:{
        type:String,
        required:true
    },
    diagonsedWidth:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        enum:["M", "F"],
        required:true,
    },
    admittedIn:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Hospital'
    }

},{timestamps:true})

export const Patient= mongoose.model("Patient", patientSchema);
