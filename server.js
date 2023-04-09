const express = require('express');
const app = express();
app.use(express.json());

const bodyParser = require('body-parser');
const url = require('url');
const queryString = require('querystring');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const serverConfig = require('./configs/server.config'); // import the server.config PORT: 3000

const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/Restaurant") // Create the DB in Mongo
    .then(() => {
        console.log("Successfully connecting Restaurant DB");
    })
    .catch((err) => {
        console.log("Error connecting to Restaurant DB", err);
        process.exit();
    })
    

require('./routes/auth.route')(app);

app.listen(serverConfig.PORT, () => {
    console.log(`Server is running on PORT ${serverConfig.PORT}`);
});
