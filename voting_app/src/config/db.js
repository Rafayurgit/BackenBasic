import mongoose from "mongoose";
const mongoURL= "mongodb://localhost:27017/votingApp";

mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})

const db= mongoose.connection;

db.on("connected", ()=>{
    console.log("connected to Mongo Server");
})

db.on("error", ()=>{
    console.log("Error occured while connecting to server");
})

db.on("disconnected", ()=>{
    console.log("Mongo server disconnected");
})

export default db;