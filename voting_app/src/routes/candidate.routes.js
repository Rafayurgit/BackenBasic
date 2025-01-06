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

router.post("/", jwtAuthMiddleware, async(req,res)=>{
    try {
        if(!(await checkAdminROle(req.user.id))){
            return res.status(403).json({message:"user doesn't have admin role"})
        }
    
        const data= req.body;
        const candidate= new Candidate(data);
        const response= candidate.save();
        console.log("Candidate data saved");
        
        res.status(200).json({response: response})
    } catch (error) {
        res.status(500).json({error:error.message, message:"Internal servar error"})   
    }

})