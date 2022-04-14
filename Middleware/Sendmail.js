const nodemailer = require("nodemailer");
//const Token = require('../Models/SalonModel')
const sendEmail = async function (email, subject, text){
    
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: 587,
            secure: true,
            auth: {
                user: process.env.USER,
                
                password: process.env.PASSWORD,
            },
        });

        await transporter.sendMail({
            from: 'snehakhadse26@gmail.com',
            to: email,
            subject: subject,
            text: text
            // html:`<p>You requested for password reset</p>
            // <h5>please click here <a href="localhost:3000/reset/${Token}">link</a> to reset password</h5>`
        });

        console.log("email sent sucessfully");
     if (error) throw error;
       
 console.log(error, "email not sent");
    };


module.exports = sendEmail;