const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const app = express()
const router = require("./Routes/UserRouter")
const urlrouter=require("./Routes/Urlrouter")
const PORT = process.env.PORT || 3000
const cors=require("cors")


app.use(express.json())
app.use(cors())
app.use('/user', router)
app.use('/user',urlrouter)




app.listen(8000, () => console.log(`app is running in ${PORT}`))


