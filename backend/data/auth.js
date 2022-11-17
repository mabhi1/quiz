const authSchema = require("../models/auth");
const validator = require("../validator/validator");

const getAuthById = async (authId) => {
    try {
        validator.stringValidator("authId", authId);
        const auth = await authSchema.where("authId").equals(authId);
        if (auth.length == 0) throw "No auth found";
        return auth[0];
    } catch (error) {
        throw "Invalid AuthCode";
    }
};

const deleteAuthById = async (id) => {
    try {
        await authSchema.deleteOne({ _id: id });
        return { deleted: true };
    } catch (error) {
        throw "Deletion incomplete";
    }
};

module.exports = {
    getAuthById,
    deleteAuthById,
};
