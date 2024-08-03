import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profilePicture:{
        type:String,
        default:""
    },
    gender:{
        type:String,
        enum:['male','female','others']
    }


},{
    timestamps:true
})


module.exports = mongoose.model("User",userSchema)