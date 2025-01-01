import { Router } from "express";
import {Person} from "../models/person.model.js";
import { jwtAuthMiddleware, generateJwt } from "../../jwt.js";


const router= Router();

router.post("/signup", async (req, res) => {
    try {
      const data = req.body;
      const newPerson = new Person(data);
      const savedPerson = await newPerson.save();

      const token= generateJwt(savedPerson.username);
      console.log("token is :", token);

      console.log("Person data saved successfully");
      res.status(200).json({response:savedPerson, token :token});

    } catch (error) {
      console.error("Error saving person:", error.message);
      res.status(500).json({ error: error.message });
    }
});

router.post("/login", async(req, res)=>{
    try {
        const {username, password}= req.body;
        const user= await Person.findOne({username:username});
    
        if(!user || !(await user.comparePassword(password))){
            res.status(401).json({error: "Username or password Incorrect"})
        }
    
        const payLoad={
            id:user.id,
            username:user.username
        }
        const token = generateJwt(payLoad)
    
        res.json({token});
    } catch (error) {
        res.status(500).json({error:error.message, message:"Internal server error"})
    }
})

router.get("/", jwtAuthMiddleware, async(req,res)=>{
    try {
        const data = await Person.find();
        console.log("Data fetched successfully");
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal swrver error"})
    }
})

router.get("/profile",jwtAuthMiddleware, async(req,res)=>{
    try {
        const userData= req.user;
        const userId= userData.id;
        const user = await Person.findById(userId);

        if(!user){
            return res.status(404).json({error:"User Not found"})
        }return res.status(200).json({user});
    } catch (error) {
        res.status(500).json({error:"Internal server error"})
    }
})

router.get("/:workType", async(req,res)=>{
    try {
        const workType=req.params.workType;
        if(workType==="chef" || workType==="waiter", workType==="Manager"){
            const response= await Person.find({worker:workType});
            res.status(200).json(response);
            console.log("Data fetched successfully");
        }
        
    } catch (error) {
        console.log("Error while fetching",error.message);
        res.status(500).json({error: error.message})
    }
})

router.put("/:id", async(req,res)=>{
    try {
        const personId= req.params.id;
        const updatedData=req.body;

        const response= await Person.findByIdAndUpdate(personId,updatedData,{
            new :true,
            runValidators:true
        })

        if(!response){
            return res.status(404).json({error:"prson not found"});
        }
        console.log("Data updated");
        rfes.status(200).json(response)
        

    } catch (error) {
        console.log(error.message, "Error while updating perons data");
        return res.status(500).json({error:error.message})
    }
})

router.delete("/:id", async(req,res)=>{
    try {
        const personId=req.params.id;
        const response= await Person.findByIdAndDelete(personId);
        if(!response){
            res.status(404).json({error: "Person not found"})
        }
        console.log("data deleted");
        res.status(200).json({message:"Person deleted successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message})
    }
    
    
})

export {router};