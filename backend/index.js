const express = require("express");
const app = express();
const routes = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app);

app.listen(3000, () => {
    console.log("Server started at http://localhost:3000/");
});
