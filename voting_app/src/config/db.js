import mongoose, { connect } from "mongoose";
const mongoURL= "mongodb://localhost:27017/votingApp";

mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})

db.connection= mongoose.connection;

db.on("connected", ()=>{
    console.log("connected to Mongo Server");
})

db.on("err", ()=>{
    console.log("Error occured while connecting to server");
})

db.on("Disconnected", ()=>{
    console.log("Mongo server disconnected");
})

export default db;