const userSchema = require("../models/users");
const validator = require("../validator/validator");

const createUser = async (email, password) => {
    validator.credentialsValidator(email, password);
    try {
        const user = await userSchema.create({
            email: email,
            password: password,
        });
        validator.emptyValidator(user, "Unable to create user");
        return user;
    } catch (error) {
        throw "Unable to create user";
    }
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
        return user;
    } catch (error) {
        throw "Invalid user";
    }
};

const getAllUsers = async () => {
    try {
        const users = await userSchema.find({});
        if (users.length == 0) throw "No users found";
        return users;
    } catch (error) {
        throw "No users found";
    }
};

const updateUserById = async (id, firstName, lastName, profile, quiz) => {
    try {
        const user = await getUserById(id);
        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (profile) user.profile = profile;
        if (quiz) user.quizzes.push(quiz);
        await user.save();
        return user;
    } catch (error) {
        throw "Could not update user";
    }
};

const getUserByEmailandPassword = async (email, password) => {
    try {
        validator.credentialsValidator(email, password);
        const user = await userSchema.where("email").equals(email).where("password").equals(password);
        validator.emptyValidator(user[0], "No user found");
        return user[0];
    } catch (error) {
        throw "No user found";
    }
};

module.exports = {
    createUser,
    getUserById,
    deleteUserById,
    getAllUsers,
    updateUserById,
    getUserByEmailandPassword,
};
