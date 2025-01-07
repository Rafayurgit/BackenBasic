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

router.put("/:candidateId",jwtAuthMiddleware, async(req,res)=>{

    try {
        if(!(await checkAdminROle(req.user.id))){
            return res.status(403).json({message:"User doesn't have admin role"})
        }
        const useId= req.params.candidateId;
        const userData= req.body;
    
        const response= await User.findByIdAndUpdate(useId, userData, {
            new:true,
            runValidators:true
        })
    
        if(!response) return res.status(404).json({message:"user not found"})
    
        console.log("Candidate data updated");
        
        res.status(200).json({response});
    } catch (error) {
        res.status(500).json({error:error.message, message:"Internal Server Error"})
    }
})

router.delete("/:candidateId", async(req,res)=>{
    try {
        if(!(await checkAdminROle(req.user.id))) return res.status(403).json({message:"User doesn't have admin role"})
        
        const userId= req.params.candidateId;

        await User.findByIdAndDelete(userId);
        console.log("Candidate deleted successfully");
        res.status(200).json({message:"User deleted successfully"})

    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error"})
        
    }
    
})