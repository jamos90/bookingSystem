const Booking = require('../models/booking');
const Rental = require('../models/rental');
const { normalizeErrors } = require('../helpers/mongoose');
const moment = require('moment');



exports.createBooking = function(req, res){
    const { startAt, endAt, totalPrice, guests, days, rental } = req.body;
    const user = res.locals.user

    const booking = new Booking({startAt, endAt, totalPrice, guests, days})

    Rental.findById(rental._id)
    //finds the rental and also finds the bookings and user objects attached to said booking.
        .populate('bookings')
        .populate('user')
        .exec((function(err,foundRental){
            if(err) {
                return res.status(422).send({errors:normalizeErrors(err.errors)});          
            }

            if(foundRental.user.id === user.id){
                return res.status(422).send({errors:{title: 'Invalid User', detail: "Cannot create booking on your rental!"}});
            }

            //Check here for vaild booking.
            if(exports.isValidBooking(booking, foundRental)){
                foundRental.bookings.push(booking);
                foundRental.save();
                booking.save();
                return res.json({created: true});
                //update user and rental
            }
            else {
                return res.status(422).send({errors:{title: 'Invalid User', detail: "Chosen dates already taken"}});
            }

            return res.json({booking, foundRental});
        }))
}

exports.isValidBooking = function(proposedBooking, rental) {
    let isVaild = true;

    //needs to be improved. Ineffiecnt to compare all bookings at once, improve later! 
    if(rental.bookings && rental.bookings.length > 0) {
        isVaild = rental.bookings.every(function(booking){
            const proposedStart = moment(proposedBooking.startAt);
            const proposedEnd = moment(proposedBooking.endAt);

            const actualStart = moment(booking.startAt);
            const actualEnd = moment(booking .endAt);
        
            return((actualStart < proposedStart && actualEnd < proposedEnd) || (proposedEnd < actualEnd && proposedEnd < actualStart));
        })
    }

    return isVaild;
}
