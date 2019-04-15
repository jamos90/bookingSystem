const express = require('express');
const router = express.Router();
const rental = require('../models/rental');

router.get('', function(req,res){
    rental.find({}, function(err,foundRentals){
        res.json(foundRentals);
    })
})

//path and params.id have to match, if the path is '/:id' the rentalId has to be req.params.id
router.get('/:id', function(req,res){

    const rentalId = req.params.id

    rental.findById(rentalId, function(err, foundRental){
        if(err) {
            res.status(422).send({errors:[{title:'rentalError', detail: 'Could not find rental'}]});
        }
        res.json(foundRental);
    })
})

module.exports = router;