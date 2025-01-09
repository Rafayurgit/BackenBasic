import express from "express";
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import {router as userRoute} from "../src/routes/user.routes.js"
import { router as candidateRoute} from "../src/routes/candidate.routes.js";

dotenv.config();

const app= express();
app.use(bodyParser.json())

app.use("/user", userRoute);
app.use("/candidate", candidateRoute);

const PORT= process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`App is listinig on ${PORT}`); 
}) 