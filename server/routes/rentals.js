const express = require('express');
const router = express.Router();
const rental = require('../models/rental');
const userRoutes = require('./user');

router.get('/secret', userRoutes.authMiddleWare, function(req,res){
    res.json({'secret':true})
})

router.get('', function(req,res){
    rental.find()
    //select will send us specific information or restrict informations sent. -bookings removes the bookings from the data being sent.
        .select('-bookings')
        .exec(function(err, foundRentals){
            if(err) {
                return res.status(422).send({errors:[{title:'Rental Error!', detail: 'Could not find rental'}]})
            } 
            res.json(foundRentals)
    })
})

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

module.exports = router;