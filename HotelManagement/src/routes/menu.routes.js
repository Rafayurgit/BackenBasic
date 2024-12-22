import express from "express";
import { Router } from "express";
import { MenuItem } from "../models/menuItem";

const router= Router();

router.get("/menu", async(req, res)=>{
    try {
        const response = await MenuItem.find();
        res.status(200).json(response);
        console.log("Data fetched successfully");
    } catch (error) {
        console.log(Error);
        res.status(500).json({Error: "Internal server error"})
    }
})

router.post("/menu", async(req,res)=>{
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