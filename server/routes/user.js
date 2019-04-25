const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller')
const User = require('../models/user')

// router.post('/auth', userController.auth());

// router.post('/register', userController.register());
router.post('/register', function(req,res){

    //destructurizing, allows you to write on one line what would otherwise be seperate lines and varaibles for each data point.
    const {userName, email, password, passwordConfirmation } = req.body;

    //error handling: if password or email are not part of the request or if they are empty strings.
    if(!email || email === "") {
       return res.status(422).send({errors:[{title:'Registration Error!', detail: 'Email is required'}]});
    }

    if(!password || password === "") {
       return res.status(422).send({errors:[{title:'Registration Error!', detail: 'Password is required'}]});
    }

    //error handling: if password and password confrimation do not match.
    if(password !== passwordConfirmation) {
       return res.status(422).send({errors:[{title:'Invalid Password', detail: 'Passwords do not match'}]});           
    }
    //checks the database to see if a user with the same email address already exists.
    User.findOne({email}, function(err, existingUser){
        if(err) {
            res.status(422).send({'mongoose': 'handle mogoose errors'});
        }

        if(existingUser) {
          return res.status(422).send({errors:[{title: "Invlaid Email",  detail: 'User with this email already exists'}]});
        }

        //if user does not exist, creates a new user using the user model.
        const user = new User({
            userName,
            email,
            password
        });

        //saves the user to the database. 
        user.save(function(err){
            if (err) {
              return res.status(422).send({'mongoose': 'handle mogoose errors in save', err});
            }
           return res.json({'registered': true})
        });
    })
});

module.exports = router;