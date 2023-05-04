const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
require("./db/conn");

dotenv.config({ path: "config.env" })

const app = express();
app.use(express.json());

const port = process.env.PORT || 3001

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:3001", "*"],
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(require("./routes/reservation"))
app.use(require("./routes/newsLetter"));

app.get("/", (req, res) => {
    res.send("Welcome to Server Side")
});

app.listen(port, () => {
    console.log("Listening on Port : " + port);
});