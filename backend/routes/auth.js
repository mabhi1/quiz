const express = require("express");
const router = express.Router();
const users = require("../data/users");
const validator = require("../validator/validator");

router.post("/login", async (req, res) => {
    try {
        if (req.session.userId) throw "Already logged in";
        const email = req.body.email;
        const password = req.body.password;
        const user = await users.getUserByEmailandPassword(email, password);
        validator.emptyValidator(user, "No user found");
        if (user.status === "unverified") throw "Please check your inbox to verify email before signing in";
        req.session.userId = user._id;
        res.status(200).json({ user: user });
    } catch (error) {
        res.status(400).json({ error: error });
    }
});

router.get("/user", async (req, res) => {
    try {
        if (!req.session.userId) throw "No user logged in";
        const user = await users.getUserById(req.session.userId);
        validator.emptyValidator(user, "No user found");
        res.status(200).json({ loggedUser: user });
    } catch (error) {
        res.status(400).json({ error: error });
    }
});

router.get("/logout", async (req, res) => {
    if (!req.session.userId) {
        res.status(400).json({ error: "No user logged in" });
        return;
    }
    req.session.destroy();
    res.status(200).json({ message: "user logged out successfully" });
});

module.exports = router;
