const Jwt = require("jsonwebtoken")
const saltround = 10
const bcrypt=require("bcrypt")

const istrim = (value) => {
    let trimdata = value.trim()
    return trimdata
}

const createtoken = async (value) => {
    let token = await Jwt.sign(value, process.env.SECRET, { expiresIn: process.env.EXPIRE })
    return token
}


const comparepassword = async (password, hashedpassword) => {
    let checkpassword = await bcrypt.compare(password, hashedpassword)
    return checkpassword
}



const hashedpassword = async (password) => {
    let salt = await bcrypt.genSalt(saltround)
    let hash = await bcrypt.hash(password, salt)
    return hash
}

module.exports = {
    istrim,
    createtoken,
    hashedpassword,
    comparepassword
}