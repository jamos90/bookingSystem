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
    passsWord: {
        type: String,
        max: [100, 'Too long, 100 is the max number of charaters'],
        min: [4, 'Too short minimum number of characters in 4'],
        required: 'Password is required'
    },
    rentals: [{
        type: Schema.Types.ObjectId, ref: 'Rental'
    }]
})

module.exports = mongoose.model('User', userSchema);