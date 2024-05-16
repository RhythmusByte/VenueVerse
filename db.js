const mongoose = require("mongoose");

let mongoURL = 'mongodb+srv://admin:afnaakhilsanooj@venueversa.lyce1nu.mongodb.net/mern-venue_verse';

mongoose.connect(mongoURL , {useUnifiedTopology : true , useNewUrlParser : true})

let connection = mongoose.connection

connection.on('error' , () => {
    console.log('Mongo DB Connection failed')
})

connection.on('connected' , () => {
    console.log('Mongo DB connection Successful')
})

module.exports = mongoose