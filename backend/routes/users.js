const express = require("express");
const router = express.Router();
const users = require("../data/users");
const quizzes = require("../data/quizzes");
const validator = require("../validator/validator");

router.get("/", async (req, res) => {
    try {
        const userList = await users.getAllUsers();
        res.status(200).json({ users: userList });
    } catch (error) {
        res.status(404).json({ error: error });
    }
});

router.post("/reset", async (req, res) => {
    try {
        const email = req.body.email;
        validator.stringValidator("email", email);
        const user = await users.getUserByEmail(email);
        validator.emptyValidator(user, "No user found");
        await users.resetPassword(user._id, email);
        res.status(200).json({ message: "successful" });
    } catch (error) {
        res.status(404).json({ error: error });
    }
});

router.get("/verify/:id", async (req, res) => {
    try {
        const id = req.params.id;
        validator.stringValidator("id", id);
        const user = await users.verifyUserById(id);
        res.status(200).json({ user: user });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.post("/", async (req, res) => {
    let user;
    try {
        email = req.body.email;
        password = req.body.password;
        firstName = req.body.firstName;
        lastName = req.body.lastName;
        validator.credentialsValidator(email, password);
        validator.emptyValidator(firstName, "Invalid First Name");
        validator.emptyValidator(lastName, "Invalid Last Name");
        user = await users.getUserByEmail(email);
        if (user) {
            res.status(400).json({ error: "Email already exists" });
            return;
        }
        validator.emailValidator(email);
        user = await users.createUser(email, password, firstName, lastName);
        res.status(200).json({ user: user });
    } catch (error) {
        res.status(400).json({ error: error });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        validator.stringValidator("id", id);
        const user = await users.getUserById(id);
        res.status(200).json({ user: user });
    } catch (error) {
        res.status(404).json({ error: error });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        validator.stringValidator("id", id);
        const user = await users.deleteUserById(id);
        res.status(200).json({ user: user });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        validator.stringValidator("id", id);
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const profile = req.body.profile;
        const quiz = req.body.quiz;
        const password = req.body.password;
        if (quiz) await quizzes.getQuizById(quiz._id);
        const user = await users.updateUserById(id, firstName, lastName, profile, quiz, password);
        res.status(200).json({ updatedUser: user });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

module.exports = router;
