const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const MongoClient = require('mongodb').MongoClient;


const model = require('../Models/SalonModel');
const req = require('express/lib/request');
const res = require('express/lib/response');
const { db } = require('../Models/SalonModel');
const { JsonWebTokenError } = require('jsonwebtoken');
let url = "mongodb+srv://salon:Salon123@cluster0.kt1sy.mongodb.net/salon-managment-system?retryWrites=true&w=majority";

//Create Api for SignUp........

const SignUp = function (req, res) {

    const Password = req.body.password;
    const Confirm_password = req.body.confirmpassword;

    MongoClient.connect(url, async function (err, db) {
        if (err) throw err;
        var database = db.db("salon-managment-system");

        const { firstname, lastname, email, dob, gender, address, mobileno, password, confirmpassword } = req.body;
        if (!(firstname && lastname && email && dob && gender && address && mobileno && password && confirmpassword)) {
            res.status(400).send("All input is required");
            console.log("All input is required")
        }

        else {
            const data = await database.collection("signUp").findOne({ email });
            if (data) {
                console.log("You are alerdy registered");
                res.send(data);
                return;
            }
        }
        if (Password === Confirm_password) {
            bcrypt.hash(req.body.password, 10, function (err, hash) {
                if (err) {
                    return res.status(500).json({
                        error: err
                    })
                }
                else {
                    const obj = new model({
                        _id: mongoose.Schema.Types.ObjectId,
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        email: req.body.email,
                        dob: req.body.dob,
                        gender: req.body.gender,
                        address: req.body.address,
                        mobileno: req.body.mobileno,
                        password: hash
                    })

                    obj.generateAuthToken()
                    database.collection("signUp").insertOne(obj, function (err, db) {
                        if (err) throw err;
                        console.log(" Document Inserted......", obj);
                        res.json(obj);
                        db.close
                    })
                }

            })
        }

        else {
            res.send("Password not match")
            console.log("Password not match")
        }
    })
}

// Create Api for LogIn........

const LogIn = function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var database = db.db("salon-managment-system");

         database.collection("signUp").findOne({ email: req.body.email}, function (err, result) {
            const password1 = database.collection("signUp").findOne({ password: req.body.password })


            if (err) throw err;
            console.log(result);
            res.send(result);



            bcrypt.compareSync(req.body.password, JSON.stringify(password1), function (err, match) {

                if (err) throw err
                else
                    (match)
                    const Token = jwt.sign(
                        { _id: this._id, email },
                        process.env.TOKEN_KEY,
                        {
                            expiresIn: "2h",
    
                        });
                        console.log(Token)
                       
                        
                    
                res.status(200).json({ Token: generateAuthToken(password1) });
                {
                    res.status(403).json({ error: "password do not match" })
                    console.log("not generate");
                }



                db.close();

            });

        });

    })

}

//Create Api for LogOut........

// const LogOut = function (req, res) {
//     req.user.deleteToken(req.TOKEN, (err, user) => {
//         if (err) return res.status(400).send(err);
//         res.sendStatus(200);
//     });

// };

const LogOut = function(req,res){
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var database = db.db("salon-managment-system");
            const user = database.collection("login").findOne({firstname:req.body.firstname})
    if(user){
        var myquery = { firstname:req.body.firstname };
        database.collection("login").deleteOne(myquery);
        console.log("Logout")
    }
})

 }
// const LogOut = function(req,res){
//     jwt.destroy()
//     res.redirect('/LogIn');
// }



//Create Api for Appointment........

const addAppointment = function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var database = db.db("salon-managment-system");

        const appoint = new model({
            _id: mongoose.Schema.Types.ObjectId,
            firstname: req.body.firstname,
            email: req.body.email,
            date: req.body.date
        })
        database.collection("appointment").insertOne(appoint, function (err, result) {

            if (err) throw err
            res.json(appoint)
            console.log("insert......", appoint);

        });
    });
    db.close();

};
const AppointmentFind = function (req, res) {

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("salon-managment-system");
        dbo.collection("appointment").find({}).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result)
            db.close();
        });
    });
};

const AppointmentDelete = function (req, res, next) {

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var database = db.db("salon-managment-system");
        var myquery = { firstname: req.body.firstname };
        database.collection("appointment").deleteOne(myquery, function (err, result) {
            if (err) throw err;
            console.log("1 document deleted");
            res.send('delete')
            db.close();
        });
    });

}

//Create Api for Forgotpassword........

const ForgotPassword = function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var database = db.db("salon-managment-system");

        const user = database.collection("signUp").findOne({ email: req.body.email }, function (err, user) {
            if (err) throw err;
            res.json(user)
            console.log(user)
        })
    })
}
           const sendEmail = function (email) {

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


                transporter.sendMail({
                    from: 'snehakhadse26@gmail.com',
                    to: user.email,
                    subject: 'For Verification',
                    html: `<p>You requested for password reset</p>
                <h5>please click here <a href="localhost:3000/reset/">link</a> to reset password</h5>`

                })

                const Update = database.collection("signUp").updateOne({ email: req.body.email }, function (err, sucess) {
                    if (err) throw err;
                    console.log(Update)
                })
            }


        




module.exports = { SignUp, LogIn, LogOut, ForgotPassword, addAppointment, AppointmentFind, AppointmentDelete }