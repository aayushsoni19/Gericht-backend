const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "config.env" });

const DB = process.env.DB;

mongoose.connect(DB, { useNewUrlParser: true, UseUnifiedTopology: true })
    .then(() => { console.log("Connected to MongoDB"); })
    .catch((err) => {
        console.log(err);
    })