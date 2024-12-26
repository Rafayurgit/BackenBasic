import express from "express";

import db from "./config/db.js"; 
import {Person} from "./models/person.model.js";
import {MenuItem} from "./models/menuItem.js";
import bodyParser from "body-parser";
import {router as personRoute} from "./routes/person.routes.js";
import { router as menuRoute } from "./routes/menu.routes.js";
import passport from "./auth.js";

const app= express();
const PORT=process.env.PORT|| 8080;

app.use(express.json())
app.use(bodyParser.json())
app.use(passport.initialize())

const localAuthMiddleware= passport.authenticate("local", {session: false});

app.listen(PORT, ()=>{
    console.log(`Server is listining on ${PORT}`);
})

app.get("/", (req,res)=>{
    res.send("Hello world")
})

app.use("/person", personRoute);
app.use("/menu", localAuthMiddleware ,menuRoute);




  



