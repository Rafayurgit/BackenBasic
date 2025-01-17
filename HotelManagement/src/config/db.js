import mongoose from "mongoose";
const mongoURL= "mongodb://localhost:27017/hotelManagement";

mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})

const db = mongoose.connection;

db.on("connected", ()=>{
    console.log("Connected to MongoDB server");
})

db.on("err", (err)=>{
    console.log("Error occured while connecting db", err);
})
db.on("disconnected", ()=>{
    console.log("mongoDb disconnected");
    
})

export default db;