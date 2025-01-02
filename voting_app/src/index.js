import express from "express";
import bodyParser from "body-parser";

const app= express();
app.use(bodyParser.json())


const PORT= process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`App is listinig on ${PORT}`); 
}) 