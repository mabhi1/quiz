import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";

const classes = {
    input: "mx-2 mb-4 p-2 px-3 rounded border-slate-300 border-2",
    form: "flex flex-col w-96",
    button: "m-2 cursor-pointer bg-fuchsia-800 text-slate-50 p-1 px-3 rounded transition hover:bg-fuchsia-700",
    label: "px-2 text-sm",
    header: "text-xl my-10 bg-slate-100 rounded p-3 px-4",
};
const Signup = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    useEffect(() => {
        if (user && user !== "nouser") navigate("/profile", { replace: true });
    }, [navigate, user]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { firstName, lastName, email, password } = e.target.elements;
        if (!firstName.value || !lastName.value || !email.value || !password.value) {
            alert("All the fields are required");
            firstName.focus();
            return;
        }
        try {
            const { data } = await axios.post(
                "http://localhost:4000/user",
                { email: email.value, password: password.value, firstName: firstName.value, lastName: lastName.value },
                {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    withCredentials: true,
                }
            );
            alert("Thank you for signing up. Please verify your account by clicking on the confirmation link mailed to you.");
            email.value = "";
            password.value = "";
            firstName.value = "";
            lastName.value = "";
            firstName.focus();
        } catch (error) {
            alert(error.response.data.error);
            email.focus();
        }
    };
    if (user === null) {
        return (
            <>
                <h2 className={classes.header}>Sign Up</h2>
                <div className="flex flex-col items-center">
                    <form onSubmit={handleSubmit} className={classes.form} encType="multipart/form-data">
                        <label htmlFor="firstName" className={classes.label}>
                            First Name
                        </label>
                        <input name="firstName" type="text" id="firstName" className={classes.input} placeholder="Enter your first name" />
                        <label htmlFor="lastName" className={classes.label}>
                            Last Name
                        </label>
                        <input name="lastName" type="text" id="lastName" className={classes.input} placeholder="Enter your last name" />
                        <label htmlFor="email" className={classes.label}>
                            Email
                        </label>
                        <input name="email" type="email" id="email" className={classes.input} placeholder="Enter your email" />
                        <label htmlFor="password" className={classes.label}>
                            Password
                        </label>
                        <input name="password" type="password" id="password" className={classes.input} placeholder="Enter your password" />

                        <input type="submit" value="Sign up" className={classes.button} />
                    </form>
                    <span>
                        Already have an account?{" "}
                        <Link to="/signin" className="text-blue-800">
                            Click to Sign in
                        </Link>
                    </span>
                </div>
            </>
        );
    }
};

export default Signup;
