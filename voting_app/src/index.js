import express from "express";
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import {user as userRoute} from "../src/routes/user.routes.js"



const app= express();
app.use(bodyParser.json())

app.use("/user", userRoute);

const PORT= process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`App is listinig on ${PORT}`); 
}) 