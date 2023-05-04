const express = require('express');
const bookingModel = require("../models/reservations.model")

const router = express.Router();

router.post("/reservations", async(req, res)=>{
    const {firstName, lastName, contact, date, time} = req.body;
    console.log(req.body);

    if(!firstName || !lastName || !contact || !date || !time){
        return res.status(404).json({error : "Details Not Found"})
    }else{
        try {
            const add = new bookingModel({firstName, lastName, contact, date, time});
            const save = await add.save();

            if(save){
                return res.status(200).json({message : "reservation Confirmed"})
            }else{
                return res.status(501).json({error : "Error Occurred while Making reservation"})
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({error : "Some Error Occurred"})
        }
    }
})

module.exports = router