//const mongoose = require('mongoose')
//const MongoClient = require('mongodb').MongoClient;
//const Appointment = mongoose.model('Appointment');
//const model = require('../Models/SalonModel')
//let url = "mongodb+srv://salon:Salon123@cluster0.kt1sy.mongodb.net/salon-managment-system?retryWrites=true&w=majority";

// const getAppointments = (req, res) => {

 
//  Appointment.find().exec((err, data) => {

//         if(err){
//             res.status(404).json(err);
//             console.log('Here');
//             return;
//         }

//         res.status(200).json(data);
//     });

// };

// const getSingleAppointment = (req, res) => {

//     Appointment.findById(req.params.id).exec((err, data) => {

//         if(err){
//             res.status(404).json(err);
//             return;
//         }

//         res.status(200).json(data);
//     });
// };

// const addAppointment = (req, res) => {

//     Appointment.create({
//         appointmentDate: req.body.appointmentDate,
//         appointmentTime: req.body.appointmentTime,
//         fullName: req.body.fullName,
//         email: req.body.email,
//         contact: req.body.contact
//     }, (err, data) => {

//         if(err)
//         {
//             res.status(404).json(err);
//         }else{
//             res.status(201).json(data);
//         }
//     });
// }

// const addAppointment = function (req, res) {
//     MongoClient.connect(url, function (err, db) {
//         if (err) throw err;
//         var database = db.db("salon-managment-system");
        
//             const appoint = new model({
//             _id: mongoose.Schema.Types.ObjectId,
//             fullname: req.body.firstname,
//             email: req.body.email,
//            appointmentDate: req.body.appointmentDate,
//            appointmentTime:req.body.appointmentTime
//         })
//         database.collection("appointment").insertOne(appoint, function (err, result) {

//             if (err) throw err
//             res.json(appoint)
//             console.log("insert......",appoint);

//         });
    
//     });
//     //db.close();

// };


// const updateAppointment = (req, res) => {

   
//     if(!req.params.id){

//         res.status(404).json({"Message": "ID not found."});
//         return;
//     }

//     Appointment.findById(req.params.id).exec((err, data) => {

//         if(!data){
//             res.status(404).json({"Message": "ID not found."});
//             return;
//         }else if(err){

//             res.status(404).json(err);
//             return;
//         }else{
            
//             data.appointmentDate = req.body.appointmentDate;
//             data.appointmentTime = req.body.appointmentTime;
//             data.fullName = req.body.fullName;
//             data.email = req.body.email;
//             data.contact = req.body.contact;
            
//         }

//         data.save((err, data) => {
            
//             if(err){
//                 res.status(404).json(err);
//             }else{
//                 res.status(200).json(data);
//             }
//         });
//     });
// };

// const deleteAppointment = (req, res) => {

//     const id = req.params.id;

//     if(id){

//         Appointment.findByIdAndRemove(id).exec((err, data) => {

//             if(err){
//                 res.status(404).json(err);
//                 return;
//             }

//             res.status(204).json(null);
//         });
//     }else{
//         res.status(404).json({"Message": "No ID found."});
//     }
// };

//module.exports = {addAppointment};