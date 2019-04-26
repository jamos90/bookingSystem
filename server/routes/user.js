const express = require('express');
const router = express.Router();
const config = require('../config/dev')
const jwt = require('jsonwebtoken');
const mongooseHelpers = require('../helpers/mongoose')
const userController = require('../controllers/user.controller')
const User = require('../models/user')

router.post('/auth', async function(req,res){
    //destructurizing, allows you to write on one line what would otherwise be seperate lines and varaibles for each data point.
    const { email, password } = req.body;

    //error handling: if password or email are not part of the request or if they are empty strings.
    if(!email || email === "") {
        return res.status(422).send({errors:[{title:'Login Error!', detail: 'Email is required'}]});
    }
 
    if(!password || password === "") {
        return res.status(422).send({errors:[{title:'Login Error!', detail: 'Password is required'}]});
    }
    //try catch block
    try {
        //uses await to check if a user exists. Remainder of block waits for await to return
        const user = await User.findOne({email});

        if(!user) {
            return res.status(422).send({errors:[{title:'Login Error', detail: 'Email is not registrd'}]});
        }

        if(user.hasSamePassword(password)){
            //uses jwt to generate a token to be passed to the client if password is correct. 
            const token = jwt.sign({
                userId: user.id,
                userName: user.userName
              }, config.SECRET, { expiresIn: '1h' });

            //returns the token in JSon formt to be passed to front end.
           return res.json(token);
        }
        else {
            return res.status(422).send({errors:[{title:'Login Error', detail: 'Wrong emial or password provided'}]});
        }
    }catch(err){
        return res.status(422).send({errors: mongooseHelpers.normailiseErrors(err.errors)});
    }


});

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
              return res.status(422).send({errors: mongooseHelpers.normailiseErrors(err.errors)});
            }
           return res.json({'registered': true})
        });
    })
});

router.authMiddleWare = async function(req,res, next) {
    const token = req.headers.authorization;

    if(token) {
        const user = this.parseToken(token);
        try {

         const user = await User.findById(user.userId)

            if(user) {
                res.locals.user = user
                //next forwards the request to the next middleware or route handler. Needs to be called when using middleware.
                next()
            }
        } catch(err) {
            return res.status(422).send({errors: mongooseHelpers.normailiseErrors(err.errors)});
        }

    } 
    else {
        return res.status(422).send({errors:[{title: 'Not autherised',  detail: 'You need to login in to get access'}]});
    }

}

router.parseToken = function(token) {
    //token.split splites the token at the first space and creates an aray with ['bearer', [token]]. bearer is standard and 
    //will form part of the autherization content always.
    return jwt.verify( token.split(" ")[1] ,config.SECRET )
}

module.exports = router;