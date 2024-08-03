import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    description:{
        type:String,
        required:true
    },
    paymentType:{
        type:String,
        enum:["cash","card"],
        required:true
    },
    amount:{
        type:Number,
        required:true
    },

    category:{
        type:String,
        enum:["saving","investment","expense"],
        required:true
    },
    location:{
        type:String,
        default:"Unknown"
    },
    date:{
        type:Date,
        required:true
    }

})


module.exports = mongoose.model("Transaction",transactionSchema)