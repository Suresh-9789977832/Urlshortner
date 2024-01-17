const mongoose = require("./index")

const userschema =new mongoose.Schema({
    firstname: {
            type:String,
            required:true
    },
    lastname: {
        type:String,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required:true
    },
    status: {
        type: String,
        required: true,
        default:"Inactive"
    },
    resetToken: {
        type:String
    },
    verified: {
        type: Boolean,
        default:false
    }
    
})


const usermodal=mongoose.model('id',userschema)


module.exports=usermodal