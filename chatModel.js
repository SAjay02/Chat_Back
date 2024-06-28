const mongoose=require("mongoose");
const productSchema=mongoose.Schema({
    username:{
        type:String,
        required:false
    },
    message:{
        type:String,
        required:false
    },
    avatar:{
        type:String,
        required:false
    },
    timestamp: {type: Date, default: Date.now}
});
module.exports = mongoose.model("Chat", productSchema);