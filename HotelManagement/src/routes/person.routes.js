import {express} from "express";
import { Router } from "express";
import { Person } from "../models/person.model";

const router= Router();

router.post("/person", async (req, res) => {
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

router.get("/person", async(req,res)=>{
    try {
        const data = await Person.find();
        console.log("Data fetched successfully");
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal swrver error"})
    }
})

router.get("/person/:workType", async(req,res)=>{
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

export {router};