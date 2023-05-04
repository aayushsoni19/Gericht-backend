const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    contact : {
        type : Number,
        required : true,
    },
    date : {
        type : String,
        required : true
    },
    time : {
        type : String,
        required : true
    }
});

const bookingModel = new mongoose.model("RESERVATIONS", bookingSchema);

module.exports = bookingModel;