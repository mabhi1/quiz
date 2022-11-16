import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import actions from "../actions";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { AiFillEye } from "react-icons/ai";

const classes = {
    input: "mx-2 p-2 px-3 rounded border-slate-300 border-2",
    form: "flex flex-col w-96",
    button: "m-2 cursor-pointer bg-fuchsia-800 text-slate-50 p-1 px-3 rounded transition hover:bg-fuchsia-700",
    label: "px-2 text-sm",
    header: "text-xl my-5 bg-slate-100 rounded p-2 px-3",
};
const Signin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    useEffect(() => {
        if (user && user !== "nouser") navigate("/profile", { replace: true });
    }, [navigate, user]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = e.target.elements;
        if (!email.value || !password.value) {
            alert("All the fields are required");
            email.focus();
            return;
        }
        try {
            const { data } = await axios.post(
                "http://localhost:4000/auth/login",
                { email: email.value, password: password.value },
                {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    withCredentials: true,
                }
            );
            dispatch(actions.signIn(data.user));
        } catch (error) {
            alert(error.response.data.error);
            email.focus();
        }
    };
    const showPassword = () => {
        const password = document.getElementById("password");
        password.type === "password" ? (password.type = "text") : (password.type = "password");
    };
    const handleReset = (e) => {
        e.preventDefault();
        alert("Password Reset");
    };
    if (user === null) {
        return (
            <>
                <h2 className={classes.header}>Sign In</h2>
                <div className="flex flex-col items-center">
                    <form onSubmit={handleSubmit} className={classes.form}>
                        <label htmlFor="email" className={classes.label}>
                            Email
                        </label>
                        <input name="email" type="email" id="email" className={classes.input} placeholder="Enter your email" />
                        <label htmlFor="password" className={classes.label + " mt-5"}>
                            Password
                        </label>
                        <input name="password" type="password" id="password" className={classes.input} placeholder="Enter your password" />
                        <AiFillEye className="self-end mr-[20px] mt-[-28px] mb-[12px] cursor-pointer" onClick={showPassword} />
                        <span className="text-sm mx-2">
                            Forgot your password?{" "}
                            <button className="text-blue-800" onClick={handleReset}>
                                Click to reset
                            </button>
                        </span>
                        <input type="submit" value="Sign in" className={classes.button + " mt-5"} />
                    </form>
                    <span>
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-blue-800">
                            Click to Sign up
                        </Link>
                    </span>
                </div>
            </>
        );
    }
};

export default Signin;
