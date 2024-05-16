const express = require("express");
const router = express.Router();

const Auditorium = require('../models/auditorium')


router.get("/getallauditoriums", async(req, res) => {

    try{
        db.getCollection('auditorium').find({});
       /* const auditorium = await Auditorium.find({}) */
        res.send(auditorium)
    }
    catch (error){
        return res.status(400).json({ message : error});
    }
       
});


module.exports = router;

