const mongoose = require("mongoose")

const urlschema = new mongoose.Schema({
    shortid: {
        type: String,
        required:true,
        unique:true  
    },

    redirectURL: {
        type: String,
        required: true
    },


}, { timestamps: true })


const urlmodal = mongoose.model("shorturl", urlschema)

module.exports=urlmodal