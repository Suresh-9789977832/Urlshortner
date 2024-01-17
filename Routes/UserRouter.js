const express = require("express")
const { signup, activate, login, forgotpassword, get_resetpassword, resetpassword } = require("../Controller/User")
const router = express.Router()

router.post('/signup', signup)

router.patch('/activate/:token', activate)

router.post('/login', login)

router.post('/forgotpassword', forgotpassword)

router.patch('/getresetpassword/:token/:id', get_resetpassword)

router.post('/reset/:token/:id', resetpassword)





module.exports=router