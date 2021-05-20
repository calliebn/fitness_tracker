// Dependencies
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3001;

const db = require("./models");

const app = express();

// Middleware
app.use(logger("dev"));

// Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static Files
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutdb", { useNewUrlParser: true, useUnifiedTopology: true });

//Routes
require('./controllers/api-routes')(app);
require('./controllers/html-routes')(app);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`)
});