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
    }
    
})


const usermodal=mongoose.model('id',userschema)


module.exports=usermodal