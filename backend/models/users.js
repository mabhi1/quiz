const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        required: true,
    },
    firstName: String,
    lastName: String,
    password: {
        type: String,
        required: true,
    },
    quizzes: [
        {
            _id: { type: mongoose.SchemaTypes.ObjectId, ref: "quizzes" },
            marks: Number,
            takenOn: { type: Date },
        },
    ],
    status: {
        type: String,
        default: "unverified",
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
    },
    updatedAt: {
        type: Date,
        defaul: () => Date.now(),
    },
});

userSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model("users", userSchema);
