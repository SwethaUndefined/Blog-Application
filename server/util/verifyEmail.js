
const nodeMailer = require("nodemailer");

require('dotenv').config();

const verifyEmail = async (email,link)=>{
    console.log(email,link)

 try{
    let transporter = nodeMailer.createTransport({
        service : "Gmail",
        auth : {
            user : "ramyaragu407@gmail.com",
            pass: process.env.PASS 
        }
    });
    let info = await transporter.sendMail({
        from : "ramyaragu407@gmail.com",
        to : email,
        subject : "Account Vertification",
        text : "Welcome",
        html : `
         <div>
         <p>Welcome to Referral Application, Please click the below link to verify the email</p>
         <a href=${link}>Click here to activate your account</a>
         </div>  `
    })
    return info;
 }
 catch (error) {
    console.error("Error creating transporter:", error);
    throw error;
  }
}

module.exports = verifyEmail;