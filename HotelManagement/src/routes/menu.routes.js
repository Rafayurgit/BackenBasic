import { Router } from "express";
import { MenuItem } from "../models/menuItem.js";

const router= Router();

router.get("/", async(req, res)=>{
    try {
        const response = await MenuItem.find();
        res.status(200).json(response);
        console.log("Data fetched successfully");
    } catch (error) {
        console.log(Error);
        res.status(500).json({Error: "Internal server error"})
    }
})

router.get("/:tasteType", async(req,res)=>{
    try {
        const tasteType=req.params.tasteType;
        if(tasteType==="sweet" || tasteType==="Spicy" || tasteType==="salty"){
            const response= await MenuItem.find({taste:tasteType});
            res.status(200).json(response);
            console.log("Data fetched successfully");
        }else{
            res.status(400).json({error: "Invalid Taste Type"});
        }
        
    } catch (error) {
        console.log("Error occured while fetching data", error.message);
        res.status(500).json({error: error.message})
    }
})

router.post("/", async(req,res)=>{
    try {
        const data= req.body;
        const newItem= await new MenuItem(data).save();
        res.status(200).json(newItem)
        console.log("Data Saved Successfully");
    } catch (error) {
        console.log("Error while saving data",error.message);
        res.status(500).json({Error: error.message})
    }
})



export {router};