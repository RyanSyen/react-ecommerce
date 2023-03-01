const express = require("express"); 
const app = express();
const cors = require("cors"); // cors allow origin resource sharing
require("dotenv").config({path:'./config.env'});
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(require("./services/users/record"));

// get mongodb driver connection
const dbo = require("./db/conn");

app.listen(port, () => {
    // start db conn when server starts
    dbo.connectToServer(function (err){
        if(err) console.error(err);
    });

    console.log(`🚀 Server is running on port: ${port}`);
})