const stringValidator = (name, str) => {
    if (!str || str.trim().length == 0) throw `Invalid ${name}`;
    return;
};

const credentialsValidator = (email, password) => {
    if (!email || !password || email.trim().length == 0 || password.trim().length == 0) throw "Invalid Credentials";
    return;
};

const emptyValidator = (data, message) => {
    if (!data) throw message;
    return;
};

module.exports = {
    stringValidator,
    credentialsValidator,
    emptyValidator,
};
