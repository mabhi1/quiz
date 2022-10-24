const stringValidator = (name, str) => {
    if (!str || str.trim().length == 0) throw `Invalid ${name}`;
    return;
};

const credentialsValidator = (email, password) => {
    if (!email || !password || email.trim().length == 0 || password.trim().length == 0) throw "Invalid Credentials";
    return;
};

const emailValidator = (email) => {
    const found = email.match("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    if (!found) throw "Invalid email type";
};

const emptyValidator = (data, message) => {
    if (!data) throw message;
    return;
};

module.exports = {
    stringValidator,
    credentialsValidator,
    emptyValidator,
    emailValidator,
};
