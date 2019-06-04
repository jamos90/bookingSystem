const express = require('express');
const router = express.Router();
const booking = require('../models/booking');
const UsersCtrl = require('../controllers/user.controller');
const userRoutes = require('../routes/user');
const BookingCrtl = require('../controllers/booking.controller');


router.post('', userRoutes.authMiddleWare, BookingCrtl.createBooking)

router.get('/manage', userRoutes.authMiddleWare, BookingCrtl.getUserBookings)
 
module.exports = router;