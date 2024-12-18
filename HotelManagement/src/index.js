const express = require("express");

const db = require("./config/db.js")
const person= require('./models/person.model.js')

const bodyParser= require("body-parser");
app.use(bodyParser.json())

const app= express();
const PORT=process.env.PORT|| 8080;


app.use(express.json())

app.get("/", (req,res)=>{
    res.send("Hello world")
})

app.post("/person", async(req,res)=>{
    

    try{

        const data= req.body;
        const newPerson=new person(data);
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