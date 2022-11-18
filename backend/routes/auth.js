const express = require("express");
const router = express.Router();
const users = require("../data/users");
const validator = require("../validator/validator");
const auth = require("../data/auth");

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

router.get("/:authId", async (req, res) => {
    try {
        const authId = req.params.authId;
        validator.stringValidator("authId", authId);
        const authData = await auth.getAuthById(authId);
        await auth.deleteAuthById(authData._id);
        if (Date.now() - new Date(authData.createdAt).getTime() > 1000 * 60 * 60 * 24) throw "Link Expired";
        res.status(200).json({ auth: authData });
    } catch (error) {
        res.status(404).json({ error: error });
    }
});

module.exports = router;
