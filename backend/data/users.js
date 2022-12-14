const userSchema = require("../models/users");
const validator = require("../validator/validator");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const transporter = require("../config/nodemailer");
const mongoose = require("mongoose");
const authSchema = require("../models/auth");

const createUser = async (email, password, firstName, lastName) => {
    try {
        validator.credentialsValidator(email, password);
        validator.emailValidator(email);
        const user = await userSchema.create({
            email: email,
            password: await bcrypt.hash(password, saltRounds),
            firstName: firstName,
            lastName: lastName,
        });
        validator.emptyValidator(user, "Unable to create user");
        const text = `Click on the link ${process.env.FRONTENDURL}/useraccount/` + user._id + " to verify your id";
        const mailOptions = {
            from: "no-reply@quiz.com",
            to: email,
            subject: "Verify your account",
            text: text,
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent " + info.response);
            }
        });
        return { _id: user._id, email: user.email, quizzes: user.quizzes };
    } catch (error) {
        throw "Unable to create user";
    }
};

const resetPassword = async (id, email) => {
    await authSchema.create({
        authId: id,
    });
    try {
        const text =
            `Click on the link ${process.env.FRONTENDURL}/user/resetpassword/` +
            id.toString() +
            " to reset you password. This link expires after 24 hours";
        const mailOptions = {
            from: "no-reply@quiz.com",
            to: email,
            subject: "Reset your password",
            text: text,
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent " + info.response);
            }
        });
        return;
    } catch (error) {
        console.log(error);
        throw "No user found";
    }
};

const verifyUserById = async (id) => {
    validator.stringValidator("id", id);
    try {
        const user = await userSchema.findById(id).select("email quizzes status");
        validator.emptyValidator(user, "Invalid User");
        if (user.status === "verified") throw "User already verified";
        user.status = "verified";
        await user.save();
        return user;
    } catch (error) {
        throw error;
    }
};

const getUserByEmail = async (email) => {
    validator.stringValidator("Email", email);
    const user = await userSchema.where("email").equals(email);
    if (user.length == 0) return null;
    return user[0];
};

const getUserById = async (id) => {
    validator.stringValidator("id", id);
    try {
        const user = await userSchema.findById(id);
        validator.emptyValidator(user, "Invalid user");
        return user;
    } catch (error) {
        throw "Invalid user";
    }
};

const deleteUserById = async (id) => {
    try {
        const user = await getUserById(id);
        await userSchema.deleteOne({ _id: id });
        return { _id: user._id, email: user.email, quizzes: user.quizzes };
    } catch (error) {
        throw "Invalid user";
    }
};

const getAllUsers = async () => {
    try {
        const users = await userSchema.find({}).select("email quizzes firstName lastName");
        if (users.length == 0) throw "No users found";
        for (let user of users) {
            delete user.password;
        }
        return users;
    } catch (error) {
        throw "No users found";
    }
};

const updateUserById = async (id, firstName, lastName, profile, quiz, password) => {
    try {
        const user = await userSchema.findById(id);
        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (profile) user.profile = profile;
        if (password) user.password = await bcrypt.hash(password, saltRounds);
        if (quiz) {
            for (let i = 0; i < user.quizzes.length; i++) {
                if (user.quizzes[i]._id == quiz._id) {
                    user.quizzes.splice(i, 1);
                }
            }
            user.quizzes.push(quiz);
        }
        await user.save();
        delete user.password;
        return { _id: user._id, email: user.email, quizzes: user.quizzes, firstName: user.firstName, lastName: user.lastName };
    } catch (error) {
        throw "Could not update user";
    }
};

const getUserByEmailandPassword = async (email, password) => {
    try {
        validator.credentialsValidator(email, password);
        const user = await userSchema.where("email").equals(email);
        validator.emptyValidator(user[0], "Invalid Credentials");
        if (!(await bcrypt.compare(password, user[0].password))) throw "Invalid Credentials";
        delete user[0].password;
        return user[0];
    } catch (error) {
        throw "Invalid Credentials";
    }
};

module.exports = {
    createUser,
    getUserById,
    deleteUserById,
    getAllUsers,
    updateUserById,
    getUserByEmailandPassword,
    getUserByEmail,
    verifyUserById,
    resetPassword,
};
