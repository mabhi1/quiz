const userRoutes = require("./users");
const quizRoutes = require("./quizes");

const constructorMethod = (app) => {
    app.use("/", quizRoutes);
    app.use("/user", userRoutes);
    app.use("*", (req, res) => {
        res.json({ Error: "Page not Found" });
    });
};

module.exports = constructorMethod;
