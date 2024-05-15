const mongoose = require("mongoose");

const auditoriumSchema = mongoose.Schema({

    name : {
        type : String , 
        required : true 
    },
    maxcount : {
        type : Number ,
        required : true
    },
    phonenumber : {
        type : Number , 
        required : true
    },
    rentperday : {
        type : Number ,
        required : true 
    },
    place : {
        type : String , 
        required : true
    },
    imageurls : [],
    currentbookings : [],
    type : {
        type : String , 
        required : true
    },
    description : {
        type : String , 
        required : true
    }
}, {
    timestamps : true,
})

const auditoriumModel = mongoose.model('auditorium' , auditoriumSchema)
module.exports = auditoriumModel
