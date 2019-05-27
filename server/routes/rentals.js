const express = require('express');
const router = express.Router();
const Rental = require('../models/rental');
const User = require('../models/user');
const userRoutes = require('./user');
const { normalizeErrors } = require('../helpers/mongoose');

router.get('/secret', userRoutes.authMiddleWare, function(req,res){
    res.json({'secret':true})
})

router.post('', userRoutes.authMiddleWare, function(req, res) {
    const { title, city, street, category, image, shared, bedrooms, description, dailyRate} = req.body

    const user = res.locals.user;

    const rental = new Rental({title, city, street, category, image, shared, bedrooms, description, dailyRate})

    Rental.create(rental, function(err, newRental){
        if(err) {
            return res.status(422).send({errors:normalizeErrors(err.errors)});
        }

        User.update({_id: user.id}, {$push: {rentals: newRental} })
        return res.json(newRental);
    })
});



//path and params.id have to match, if the path is '/:id' the rentalId has to be req.params.id
router.get('/:id', function(req,res){

    const rentalId = req.params.id

    rental.findById(rentalId)
    //second argument in populate allows you to specifiy what to send, restricted properties are denoted with the  - sign. ie id will
    // not be sent in the user example below.
        .populate('user', 'userName -_id')
        .populate('bookings', 'startAt endAt -_id')
        .exec(function(err, foundRental){
            if(err) {
             return res.status(422).send({errors:[{title:'Rental Error!', detail: 'Could not find rental'}]})
            }
            return res.json(foundRental);
    })
})

router.get('', function(req,res){
    const city = req.query.city;

    if(city) {
        rental.find({city})
        .select('-bookings')
        .exec(function(err, filtredRentals){
            if(err) {
                return res.status(422).send({errors:normalizeErrors(err.errors)}); 
            }
            if(filtredRentals.length === 0) {
                return res.status(422).send({errors:[{title:'No rentals found', detail: `No rentals found for ${city}`}]})
            }

            console.log(filtredRentals);

            return res.json(filtredRentals);
        })

    }
    else {
        rental.find()
        //select will send us specific information or restrict informations sent. -bookings removes the bookings from the data being sent.
            .select('-bookings')
            .exec(function(err, foundRentals){
                if(err) {
                    return res.status(422).send({errors:[{title:'Rental Error!', detail: 'Could not find rental'}]})
                } 
                res.json(foundRentals)
        })
    }
})



module.exports = router;