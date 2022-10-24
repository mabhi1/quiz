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
const cors = require("cors");
app.use(
    cors({
        origin: "http://localhost:3000",
        optionsSuccessStatus: 200,
        credentials: true,
    })
);
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
const PORT = process.env.PORT || 4000;
app.listen(4000, () => {
    console.log(`Server started at http://localhost:${PORT}/`);
});
