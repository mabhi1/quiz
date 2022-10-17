const userRoutes = require("./users");
const quizRoutes = require("./quizzes");
const authRoutes = require("./auth");

const constructorMethod = (app) => {
    app.use("/quiz", quizRoutes);
    app.use("/user", userRoutes);
    app.use("/auth", authRoutes);
    app.use("*", (req, res) => {
        res.status(404).json({ Error: "Page not Found" });
    });
};

module.exports = constructorMethod;
