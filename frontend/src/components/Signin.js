import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import actions from "../actions";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Signin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    useEffect(() => {
        if (user) navigate("/profile", { replace: true });
    }, [navigate, user]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = e.target.elements;
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
        } catch (error) {}
    };
    if (user === null) {
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <input name="email" type="email" id="email" />
                    <br />
                    <br />
                    <input name="password" type="password" id="password" />
                    <br />
                    <br />
                    <input type="submit" value="submit" />
                </form>
            </div>
        );
    }
};

export default Signin;
