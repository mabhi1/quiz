const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
    authId: { type: String, required: true },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
    },
});

module.exports = mongoose.model("auth", authSchema);
