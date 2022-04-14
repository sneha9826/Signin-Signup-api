const nodemailer = require("nodemailer");
const token = require('./SalonModel')
const sendEmail = function (email){
    
        const transporter = nodemailer.createTransport({
            host: 'smtp'.gmail.com,
            port: 587,
            secure: true,
            auth: {
                user: 'snehakhadse26@gmail.com',
                pass: 'SampleIdPassword',
            },
        });

   transporter.sendMail({
            from: 'snehakhadse26@gmail.com',
            to: email,
            subject: 'For Verification',
            html:`<p>You requested for password reset</p>
            <h5>please click here <a href="localhost:3000/reset/">link</a> to reset password</h5>
                                     `
        });

        console.log("email sent sucessfully");
     if (error) throw error;
       
 console.log(error, "email not sent");
    };


module.exports ={ sendEmail};