const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');
const rental = require('./models/rental');
const FakeDb = require('./fake-db');
const path = require('path');

const rentalRoutes = require('./routes/rentals');
const userRoutes = require('./routes/user');
const bookingRoutes = require('./routes/booking')

// mongodb+srv://jamosamos90:M3lb0urne15!@cluster0-rxeiw.mongodb.net/test?retryWrites=true

mongoose.connect(config.dbUri).then(()=>{
    if(process.env.NODE_ENV !== 'production') {
        const fakeDb = new FakeDb();
        // fakeDb.seedDb();
    }
})
.catch((error)=>{
    console.error(error);
})

const app = express();
//body parser allows us to use the req.body acessor in our controller 
app.use(bodyParser.json());

app.use('/api/v1/rentals', rentalRoutes );
app.use('/api/v1/users', userRoutes );
app.use('/api/v1/bookings', bookingRoutes);

if(process.env.NODE_ENV === 'production') {

    const appPath = path.join(__dirname,'..', 'dist');
    app.use(express.static(appPath));
    app.get('*', function(req,res){
        res.sendFile(path.resolve(appPath, 'index.html'))
    })
}

const PORT = process.env.PORT || 3001

app.listen(PORT, function(){
    console.log("im running");
})