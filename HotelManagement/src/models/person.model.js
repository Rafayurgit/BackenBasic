import mongoose from "mongoose";
import bcrypt from "bcrypt";

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

personSchema.pre("save", async function(next){
    const person=this;

    if(!person.isModified("password")) return next();

    try {
        const salt =await bcrypt.genSalt(10);
        const hashPassword= await bcrypt.hash(person.password, salt);
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



export const Person= mongoose.model("Person", personSchema);
 
// module.exports =person;
