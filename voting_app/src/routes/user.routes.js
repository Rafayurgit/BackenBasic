import express from "express";
import {User} from "../models/user.model.js"
import { generateJwt } from "../jwt.js";
import { jwtAuthMiddleware } from "../../../HotelManagement/jwt.js";


const router= express.Router();

router.post("/signUp", async(req,res)=>{
    try {
        const data= req.body;
        const newUser=await new User(data).save();

        const adminUser= await User.findOne({role:"Admin"})
        if(data.role==="admin" && adminUser) return res.status(400).json({error:"Admin already exist"})
            
        console.log("Data Saved");

        const payLoad={
            id:newUser.id
        }
        const token=generateJwt(payLoad);
        res.status(200).json({newUser:newUser, token:token})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message, message:"Internal server error"})
    }
})

router.post("/login", async(req,res)=>{
    try {
        const {adharNo, password}= req.body;
        if(!adharNo || !password){
            return res.status(401).json({error:"Invalid username or password"})
        }

        const user= await User.findOne({adharCard:adharNo})

        if( !user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'Invalid Aadhar Card Number or Password'});
        }

        const payLoad={
            id:user.id
        }
        

        const token=generateJwt(payLoad)
        res.status(200).json({token});
    } catch (error) {
        res.status(500).json({error:error.message, message:"Internal server error"})

    }
})

router.get("/profile", jwtAuthMiddleware, async(req,res)=>{
    try {
        const userData= req.body;
        const userId=userData.id;
        const user= await User.findById(userId);
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({error:error.message, message:"Internal server error"})
    }
})

router.put("/profile/password", async(req,res)=>{
    try {
        const userId= req.user.id;
        const {currentPassword, newPassword}= req.body;

        const user= await User.findById(userId);
        if(!(await user.comparePassword(currentPassword))){
            return res.status(401).json({error:"Invalid password"})
        }

        user.password= newPassword;
        await user.save();
        console.log("Password Updated");
        res.status(200).json({message:"Password updated"})
    } catch (error) {
        res.status(500).json({error:error.message, message:"Internal server error"})
    }
})

export {router}