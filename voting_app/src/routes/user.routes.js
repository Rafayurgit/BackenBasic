import express from "express";
import User from "../models/user.model.js"
import { generateJwt } from "../jwt.js";


const router= express.Router();

router.post("/signUp", async(req,res)=>{
    try {
        const data= req.body;
        const newUser=await new User(data).save();
        console.log("Data Saved");

        const payLoad={
            id:newUser.id
        }
        const token=generateJwt(payLoad);
        res.status(200).json({newUser:newUser, token:token})
        
    } catch (error) {
        res.status(500).json({error:error.message, message:"Internal server error"})
    }

})