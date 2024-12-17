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

app.post("/person", (req,res)=>{
    const data= req.body;
    const newPerson=new person(data);

    newPerson.save((error, savedPerson)=>{
        if(error){
            console.log("Error saving person", error);
            res.status(500).json({error: "Internal server error"})
        }else{
            console.log("Person data saved successfully");
            res.status(200).json(savedPerson);
        }
    })
})


app.listen(PORT, ()=>{
    console.log(`Server is listining on ${PORT}`);
})