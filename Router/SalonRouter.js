const express = require('express');
 
const router = express.Router();

const request = require('../Controller/SalonController');




router.post('/signup', request.SignUp);
router.post('/login',request.LogIn);
router.post('/logout',request.LogOut);

router.post('/forgotpassword',request.ForgotPassword);
router.post('/appointment',request.addAppointment);

 module.exports = router;