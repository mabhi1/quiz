const signIn = (user) => ({
    type: "SIGN_IN_USER",
    payload: user,
});

const signOut = () => ({
    type: "SIGN_OUT_USER",
    payload: null,
});

module.exports = {
    signIn,
    signOut,
};
