import mongoose from 'mongoose';

const productSchema= new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true,
    },
    productImage:{
        type:String,
    },
    price:{
        type:Number,
        default:0
    },
    stock:{
        type:Number,
        default:0,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Categoty",
        required:true,
    },
    owner:{
        type:mongoose.Schema.TYpes.ObjectId,
        ref:"User",
        
    }
},{timestamps:true})

export const Product=mongoose.model("Product", productSchema);