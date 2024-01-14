const { default: ShortUniqueId } = require("short-unique-id")
const urlmodal = require("../Modal/urlmodal")



const generateshorturl = async (req, res) => {

    const uid = new ShortUniqueId({ length: 10 })
    const shortid=uid.rnd()
    const url = req.body.url

    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/
    const finalurl = urlRegex.test(url)
    
    if(!url) return res.status(400).json({error:"url is required"})
        if (finalurl) {
           let data= await urlmodal.create({
                shortid: shortid,
                redirectURL: url,
                visitHistory:[]
            })
            res.status(200).send({
                message: "shorturl created",
                id: shortid,
                data
            })
        
        }
        else {
            res.status(401).send({
                message:"Invalid url"
            })
        }
    }



const geturl = async (req, res) => {
    try {
        const shorturl = req.params.shortid
        const url = await urlmodal.findOne({ shortid: shorturl })
        console.log(url)
        if (url) {
            res.redirect(url.redirectURL)
        }
        else {
            res.status(400).send({
                message:"Invalid url"
            })
        }
    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            errormessage:error.message
        })
    }

}


const getallurl = async (req, res) => {
    try {
        const getall = await urlmodal.find()
        res.status(200).send({
            message: "find all urls",
            getall
        })
    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            errormessage:error.message
        })
    }
}






module.exports = {
    generateshorturl,
    geturl,
    getallurl
}