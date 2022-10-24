"use strict";
// Environment variables
require("dotenv").config();

// MongoDB Connection
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGOURL);

// Express Server
const express = require("express");
const app = express();
const routes = require("./routes");

// Express session
const session = require("express-session");

// Middlewares
app.use(
    session({
        name: "AuthCookie",
        secret: "sacredword",
        resave: false,
        saveUninitialized: false,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuring routes
routes(app);

// starting server
app.listen(3000, () => {
    console.log("Server started at http://localhost:3000/");
});
