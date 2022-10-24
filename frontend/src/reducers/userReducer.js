const userReducer = (state = null, action) => {
    const { type, payload } = action;
    switch (type) {
        case "SIGN_IN_USER":
            return payload;
        case "SIGN_OUT_USER":
            return null;
        default:
            return "nouser";
    }
};

export default userReducer;
