import { Router } from "express";
import {Person} from "../models/person.model.js"


const router= Router();

router.post("/", async (req, res) => {
    try {
      const data = req.body;
      const newPerson = new Person(data);
      const savedPerson = await newPerson.save();
      console.log("Person data saved successfully");
      res.status(200).json(savedPerson);
    } catch (error) {
      console.error("Error saving person:", error.message);
      res.status(500).json({ error: error.message });
    }
});

router.get("/", async(req,res)=>{
    try {
        const data = await Person.find();
        console.log("Data fetched successfully");
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal swrver error"})
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

    } catch (error) {
        console.log(error.message, "Error while updatinf perons data");
        return res.status(500).json({error:error.message})
    }
})

export {router};