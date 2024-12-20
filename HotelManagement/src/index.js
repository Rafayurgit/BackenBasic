import express from "express";

import db from "./config/db.js"; 
import {Person} from "./models/person.model.js";
import {MenuItem} from "./models/menuItem.js";
import bodyParser from "body-parser";

const app= express();
const PORT=process.env.PORT|| 8080;

app.use(express.json())
app.use(bodyParser.json())

app.listen(PORT, ()=>{
    console.log(`Server is listining on ${PORT}`);
})

app.get("/", (req,res)=>{
    res.send("Hello world")
})

app.post("/person", async (req, res) => {
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

app.get("/person", async(req,res)=>{
    try {
        const data = await Person.find();
        console.log("Data fetched successfully");
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal swrver error"})
    }
})

app.get("/person/:workType", async(req,res)=>{
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

  
app.get("/menu", async(req, res)=>{
    try {
        const response = await MenuItem.find();
        res.status(200).json(response);
        console.log("Data fetched successfully");
    } catch (error) {
        console.log(Error);
        res.status(500).json({Error: "Internal server error"})
    }
})

app.post("/menu", async(req,res)=>{
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


