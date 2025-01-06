import { Router } from "express";
import Candidate from "../models/candidate.model"
import { User } from "../models/user.model";
import { jwtAuthMiddleware } from "../../../HotelManagement/jwt";

const router=Router();

const checkAdminROle=async(userId)=>{
    try {
        const user= await User.findById(userId);
        if(user.role==="admin"){
            return true
        }
    } catch (error) {
        return false;
    }
}

router.post("/", jwtAuthMiddleware, (req,res)=>{

    
})