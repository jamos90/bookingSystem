const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String, 
        required: true, 
        max: [100, 'Too long, 100 is the max number of charaters'],
        min: [4, 'Too short minimum number of characters in 4']
    },
    email:{type: String, 
        required: true,
        max: [100, 'Too long, 100 is the max number of charaters'],
        min: [4, 'Too short minimum number of characters in 4'],
        unique: true,
        lowercase: true,
        required: 'Email is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/] 
    },
    password: {
        type: String,
        max: [100, 'Too long, 100 is the max number of charaters'],
        min: [4, 'Too short minimum number of characters in 4'],
        required: 'Password is required'
    },
    rentals: [{
        type: Schema.Types.ObjectId, ref: 'Rental'
    }]
})

//Schema.methods allows you to create your own methods 
userSchema.methods.hasSamePassword = function(requestedPassword) {
    //uses the bcrypt library to compare the passed password with that sorted agisnt this user. Need to use bcrypt because the pass
    //word is hashed.
    return bcrypt.compareSync(requestedPassword, this.password);
}

//callback funciton is called just before data is saved to db. Good place to encode sensitive information.
userSchema.pre('save', function(next){
    //this context holds our user when it is being saved. Gives access to password etc
    const user = this;
    
    //salt is required for hashing a password. Increases the security with greater numbers of rounds, first parameter of getSalt(). Here it is 10.
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            // Store hash in your password DB.
            user.password = hash;
            //calls the functions that our next in the que. Saving user to database for example. Is required.
            next();
        });
    });
});

module.exports = mongoose.model('User', userSchema);