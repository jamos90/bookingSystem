const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/dev');
const rental = require('./models/rental');

// mongodb+srv://jamosamos90:M3lb0urne15!@cluster0-rxeiw.mongodb.net/test?retryWrites=true

mongoose.connect(config.dbUri)

const app = express();

app.get('/rentals', function(req,res){
    res.json({sucess: true})
})

const PORT = process.env.PORT || 3001

app.listen(PORT, function(){
    console.log("im running");
})