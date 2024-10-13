import mongoose from 'mongoose';

const todoSchema=new mongoose.Schema({
    content:{
        type:String,
        require:true,
    },
    complete:{
        type:Boolean,
        default:false
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    subTodos:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"SubTodo"
        }
    ]//Array of sub-Todos
},{timestamps:true})

export const Todo= mongoose.model('Todo', todoSchema)