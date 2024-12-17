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



app.listen(PORT, ()=>{
    console.log(`Server is listining on ${PORT}`);
})