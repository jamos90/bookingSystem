const Booking = require('../models/booking');
const Rental = require('../models/rental');
const User = require('../models/user');
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
                booking.user = user;
                booking.rental = foundRental
                foundRental.bookings.push(booking);
                foundRental.save();
                booking.save(function(err){
                    if(err) {
                        return res.status(422).send({errors:normalizeErrors(err.errors)});              
                    }
                    
                    User.update({_id: user.id}, {$push: {bookings: booking}}, function(err){
                        if(err) {
                            return res.status(422).send({errors: normalizeErrors(err.errors)});
                        }
                    })
                });

                return res.json({startAt: booking.startAt, endAt: booking.endAt});
            }
            else {
                return res.status(422).send({errors:{title: 'Invalid User', detail: "Chosen dates already taken"}});
            }
        }));
}

exports.getUserBookings = function(req,res) {
    const user = res.locals.user;
    

    Booking.where({user: user}).populate('rental').exec(function(err, foundBookings){
        
        if(err) {
            return res.status(422).send({errors:normailiseErrors(err.errors)});   
        }
        
        return res.json(foundBookings);             
    })
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


