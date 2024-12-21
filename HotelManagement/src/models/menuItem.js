import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    peice:{
        type:number,
        required:true
    },
    taske:{
        type:String,
        enum:[sweet, spicy,salty]
    },
    is_drink:{
        type:Boolean,
        default:false
    },
    ingredients:{
        type:[String],
    },
    num_sales:{
        type:Number,
        default:0
    }
})
export default MenuItem= mongoose.model("MenuItem", MenuSchema)