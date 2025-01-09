import { Router } from "express";
import Candidate from "../models/candidate.model"
import { User } from "../models/user.model";
import { jwtAuthMiddleware } from "../../../HotelManagement/jwt";
import { use } from "passport";

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

router.post("/vote/:candidateId", async(req,res)=>{
    const userId= req.user.id;
    const candidateId=req.params.candidateId;

    try {
        const user= await User.findById(userId);
        const candidate= await Candidate.findById(candidateId);

        if(!candidate) return res.status(404).json({error:"candidate not found"});
        if(!use) return res.status(404).json({error:"User not found" });
        if(user.role==="Admin")return res.status(400).json({error:"Admin can not vote"});
        if(user.isVoted) return res.status(403).json({error:"You have already voted"});

        candidate.votes.push({user:userId})
        candidate.voteCount++;
        await candidate.save();

        user.isVoted=true;
        await user.save();

        res.status(200).json({message:"Vote recored successfully"})

    } catch (error) {
        res.status(500).json({error:error.message, message:"Internal server error"})
    }
})

router.get("/vote/count", async (req,res) => {
    try {
        
        const candidate=await Candidate.find().sort({voteCount:"desc"})
        const voteRecord= await candidate.map((data)=>{
            return {
                party:data.party,
                count:data.voteCount
            }
        })

        res.status(200).json({voteRecord})
    } catch (error) {
        res.status(500).json({error:error.message, message:"Internal server error"})
    }
})