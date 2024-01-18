const usermodal = require("../Modal/Usermodal")
const auth = require("../Common/auth")
const nodemailer = require("nodemailer")
const jwt = require("jsonwebtoken")
const bcrypt=require("bcrypt")


const { default: ShortUniqueId } = require("short-unique-id")



const signup = async (req,res) => {

    try {


        let {firstname,lastname,password,email}=req.body

        // const firstname = req.body.firstname
        // const lastname = req.body.lastname
        // let password = req.body.password
        // const email=req.body.email

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
                text: `https://eclectic-donut-19ba94.netlify.app/activate/${token}`
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
    try {

    const email = req.body.email

    const user = await usermodal.findOne({ email: email })
        
        if (!user) {
            res.status(400).send({
                 message:"please enter valid email "
             })
        }

    const randomString =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
        const link=`https://eclectic-donut-19ba94.netlify.app/reset/${randomString}/${user._id}`
        
        user.resetToken=randomString

        await usermodal.findByIdAndUpdate(user.id, user)
        
        
          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: 'sanddysuresh@gmail.com',
                pass: 'ydbo imta ewqu ceku'
            },
          });
      
          const sendMail = async () => {
            const info = await transporter.sendMail({
              from: `"sanddysuresh@gmail.com" <${'sanddysuresh@gmail.com'}>`,
              to: user.email,
              subject: "Reset Password",
              text: link,
            });
          };
      
          sendMail()
            .then(() => {
              return res
                .status(201)
                .json({ message: `Mail has been send to ${user.email}` });
            })
            .catch((err) => res.status(500).json(err.message));
      
          //
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Internal server error",
            errormessage:error.message
        })
        //   return res
        //     .status(400)
        //     .json({ message: "Error on updating please try again later" });
        }
      
}

const confirm_user = async (req, res) => {

    try {
        const resetToken = req.params.token;
        console.log(resetToken)
        const user = await usermodal.findOne({_id:resetToken});
        console.log(user)
        //if student not found throw error
        if (!user) {
          return res
            .status(400)
            .json({ message: "student not exists or link expired" });
        }
    
        //confirming and updating account
        user.verified = true;
    
        user.resetToken = "";
    
        await usermodal.findByIdAndUpdate(user.id, user);
    
        res.status(201).json({
          message: `${user.firstname} account has been verified successfully`,
        });
        //
      } catch (error) {
        return res
          .status(400)
          .json({ message: "student not exists or link expired" });
      }
    

}

const resetpassword = async (req, res) => {
    try {
        const resetToken = req.params.token;
        const password=req.body.password
        const user = await usermodal.findOne({ _id: resetToken });
        
        //if student not found throw error
        if (!user) {
           res
            .status(400)
            .json({ message: "student not exists or link expired" });
        }
        console.log(user)
        // hasing the new password and update
        const hashedPassword = await bcrypt.hash(password, 10);
    
        user.password = hashedPassword;
    
        await usermodal.findByIdAndUpdate(user.id, user);
    
        //sending response
    
        res.status(201).json({
          message: `${user.firstname} password has been updated successfully`,
        });
        //
      } catch (error) {
        return res
          .status(500)
          .json({ errormessage: error.message });
      }
}







module.exports = {
    signup,
    activate,
    login,
    confirm_user,
    forgotpassword,
    resetpassword
}