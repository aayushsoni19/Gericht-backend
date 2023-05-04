const express = require('express')
const newsLetterModel = require("../models/newsletter.model");
const mailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config({path : "config.env"})


const router = express.Router();
var userEmail;
var appPassword = process.env.PASSWORD;

const senderEmail = "vatsalalphavisuals@gmail.com";


router.post("/newsletter", async (req, res) => {
    const { email } = req.body;
    userEmail = email.email;

    if (!userEmail) {
        return res.status(404).json({ error: "Email Not Found" })
    } else {
        try {
            const fetch = await newsLetterModel.findOne({ userEmail: userEmail });

            if (fetch) {
                return res.status(501).json({ error: "Email Already Registered" })
            } else {
                const add = new newsLetterModel({ userEmail });
                const save = await add.save();

                if
                    (save) {

                    const transporter = mailer.createTransport({
                        service: "gmail",

                        auth: {
                            user: senderEmail,
                            pass: appPassword
                        }
                    });

                    const mailOption = {
                        from: senderEmail,
                        to: userEmail,
                        subject: "WELCOME Email",
                        html: `<h3> Welcome to GERICHT RESTAURANT </h3>`
                    }
    
                    transporter.sendMail(mailOption, async (error, info) => {
                        return error ? console.log(error) : res.status(200).json({ message: "Email Sent to your Email ID" })
                    });
                } else {
                    return res.status(502).json({ error: "Error occurred while registering" })
                }
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Some Error Occurred" })
        }
    }
})

module.exports = router