import express from "express";

import db from "./config/db.js"; 
import {Person} from "./models/person.model.js";

import bodyParser from "body-parser";

const app= express();
app.use(bodyParser.json())


const PORT=process.env.PORT|| 8080;


app.use(express.json())

app.get("/", (req,res)=>{
    res.send("Hello world")
})

app.post("/person", async(req,res)=>{
    

    try{

        const data= req.body;
        const newPerson=new Person(data);
        const response= await newPerson.save();
        console.log("Person data saved successfully");    
        res.status(200).json(savedPerson);

    }catch(error){
        console.log("Error saving person", error);
            res.status(500).json({error: "Internal server error"})
    }

    // newPerson.save((error, savedPerson)=>{
    //     if(error){
            
    //     }else{
            
    //     }
    // })
})


app.listen(PORT, ()=>{
    console.log(`Server is listining on ${PORT}`);
})