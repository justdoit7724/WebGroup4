var express = require('express');
var app = express();
require('dotenv').config(); // This should be the first line to ensure environment variables are loaded first
const cookieParser = require("cookie-parser");
var bodyParser = require('body-parser');
const { connectDB } = require("./DB/DBManager.js"); // Ensure correct case-sensitivity in file paths and method names
const Route = require("./config/router.js");
const {requireAuth} = require("./utils/utils");
var express = require('express');
var bodyParser = require('body-parser');

// Invoke the function to get the router app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(express.static('./public'));
app.use(express.static("./node_modules"));
app.set('views', './app/views');
app.set('view engine', 'ejs');
const expressConfig = require('./config/router.js'); // This should be a function that returns an express app

app.set('views', './app/views');
app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(express.static("./node_modules"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000; // Use the PORT from environment variables if defined, otherwise default to 3000

// Connect to the database before starting the server
connectDB().then(() => {
    app.listen(port, function() {
        console.log(`Server listening on port ${port}`);
    });
}).catch(err => {
    console.error('Database connection failed', err);
    process.exit(1); // Exit the process if the database connection fails
});

app.use(Route);

module.exports = app; // This is usually not necessary unless you're exporting the app for testing purposes
