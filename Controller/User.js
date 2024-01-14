const usermodal = require("../Modal/Usermodal")
const auth = require("../Common/auth")
const nodemailer = require("nodemailer")
const jwt = require("jsonwebtoken")


const { default: ShortUniqueId } = require("short-unique-id")



const signup = async (req,res) => {

    try {

        let firstname =(req.body.firstname) 
        let lastname = (req.body.lastname)
        let  password = (req.body.password)
        let email = (req.body.email)

        password=await auth.hashedpassword(password)

        let user = await usermodal.findOne({ email: email })
        console.log(user)
        
        if (user) {
            res.status(400).send({
                message: `${email} already exists`
            })
        }
        else {
            
            await usermodal.create({ firstname, lastname, email, password })
            let data = await usermodal.findOne({ email: email })
            if (data) {
                const token=await auth.createtoken({firstname:data.firstname,lastname:data.lastname,email:data.email,status:data.status})
                var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'sanddysuresh@gmail.com',
                  pass: 'ydbo imta ewqu ceku'
                }
              });
              
              var mailOptions = {
                from: 'sanddysuresh@gmail.com',
                to: `${email}`,
                subject: 'Reset your password',
                text: `https://urlshort-ocx8.onrender.com/${token}`
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {    
                  console.log(error);
                } else {
                    return res.send({
                        message: "User created mail send for account activation please click to activate your account",
                        token
                    })
                }
              });
            }
            

        }
    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            errormessage:error.message
        })
    }


}



const activate = async (req, res) => {

    try {
        const token = req.params.token
        const verifytoken = jwt.verify(token, process.env.SECRET)
        const status="active"
    
        if (!verifytoken) {
            
            res.status(400).send({
                message:"user not exists"
            })
        }
        else {
            const decodetoken = await jwt.decode(token)
            const user = await usermodal.findOne({ email: decodetoken.email })
            user.status = status
            user.save()
            res.status(200).send({
                message: "user account active",
                data:user.status
            })
        }
     
    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            errormessage:error.message
        })
    }
}


const login = async (req, res) => {
   
    try {

        const email = req.body.email
        const password = req.body.password

        let activeuser = await usermodal.findOne({ email: email })

        if (email, password) {
            
        if (activeuser) {
            if (password) {
                let user = await activeuser.status == 'active'
                if (user) {
                    if (await auth.comparepassword(password, activeuser.password)) {
                        res.status(200).send({
                            message: "user login successfully"
                        })
                    }
                    else {
                        res.status(400).send({
                            message:"Invalid password"
                        })
                    }   
                }
                else {
                    res.status(400).send({
                        message:"Your account is not activated, check your mail for activate link"
                    })
                }
            }
            else {
                res.status(400).send({
                    message:"Enter your registred password"
                })
            }
        }
        else {
            res.status(400).send({
                message:"Enter your registred email id"
            })
        }
        }
        else {
            res.status(400).send({
                message:"Please fill all field"
            })
        }

      

    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            errormessage:error.message
        })
    }
}

const forgotpassword = async (req, res) => {
    const email = req.body.email

    const user = await usermodal.findOne({ email: email })
    try {
        if (email) {
            if (user) {
                const token = await auth.createtoken({ name: user.name, email: user.email ,id:user._id})
                const id = user._id
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: 'sanddysuresh@gmail.com',
                      pass: 'ydbo imta ewqu ceku'
                    }
                  });
                  
                  var mailOptions = {
                        from: 'sanddysuresh@gmail.com',
                        to: `${email}`,
                        subject: 'Reset your password',
                        text:`https://urlshort-ocx8.onrender.com/${token}/${id}`
                    };
                    
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {    
                      console.log(error);
                    } else {
                        return res.send({
                            message: "Mail send successfully please check your mail",
                            token,
                            id
                     })
                    }
                  });
            }   
            else {
                res.status(400).send({
                    message:"Enter your registred email id"
                })
            }
        }
        else {
            res.status(400).send({
                message:"Enter your email id"
            })
        }
    
     
    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            errormessage:error.message
        })
    }
}

const get_resetpassword = async (req, res) => {

    try {
        const {token } = req.params
        const verifytoken = await jwt.verify(token, process.env.SECRET)
        if (!verifytoken) {
                res.status(400).send({
                message:"user not exists"
            })
        }
        else {
            res.status(200).send({
                message:"valid user"
            })
        }
    
    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            errormessage:error.message
        })
    }

}


const resetpassword = async (req, res) => {
    try {
        const {id} = req.params
        const password = req.body.password

        if (password) {
            const newpassword = await auth.hashedpassword(password)

            if (newpassword) {
                let data = await usermodal.findOne({_id:id})
                 data.password=newpassword
                data.save()
                res.status(200).send({
                    message:"new password updated"
                })
            }
    
        }
        else {
            res.status(400).send({
                message: "Please enter your password"
            })
        }

        
    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            errormessage:error.message
        })
    }
}







module.exports = {
    signup,
    activate,
    login,
    get_resetpassword,
    forgotpassword,
    resetpassword
}