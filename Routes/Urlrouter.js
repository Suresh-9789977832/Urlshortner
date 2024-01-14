const express = require("express")
const { generateshorturl, geturl, getallurl } = require("../Controller/Url")
const router = express.Router()

router.post('/createshorturl', generateshorturl)

router.get('/geturl/:shortid', geturl)

router.get('/',getallurl)



module.exports=router