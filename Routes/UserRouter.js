const express = require("express")
const { signup, activate, login, forgotpassword, resetpassword, confirm_user } = require("../Controller/User")
const router = express.Router()

router.post('/signup', signup)

router.patch('/activate/:token', activate)

router.post('/login', login)

router.put('/forgotpassword', forgotpassword)

router.patch('/confirmuser/:id', confirm_user)

router.post('/reset/:token/:id', resetpassword)





module.exports=router