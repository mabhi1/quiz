const quizzes = require("./quizzes.json");
const users = require("./users.json");

const userSchema = require("../models/users");
const quizSchema = require("../models/quizzes");

require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGOURL);

const main = async () => {
    try {
        await userSchema.insertMany(users);
        await quizSchema.insertMany(quizzes);
        console.log("Done seeding database");
    } catch (error) {
        console.log(error.message);
    }
};

main();
