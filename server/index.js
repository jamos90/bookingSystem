const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/dev');
const rental = require('./models/rental');
const FakeDb = require('./fake-db');
const rentalRoutes = require('./routes/rentals');

// mongodb+srv://jamosamos90:M3lb0urne15!@cluster0-rxeiw.mongodb.net/test?retryWrites=true

mongoose.connect(config.dbUri).then(()=>{
    const fakeDb = new FakeDb();
    fakeDb.seedDb();
})
.catch((error)=>{
    console.error(error);
})

const app = express();

app.use('/api/v1/rentals', rentalRoutes );

const PORT = process.env.PORT || 3001

app.listen(PORT, function(){
    console.log("im running");
})