import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const classes = {
    input: "mx-2 mb-4 p-2 px-3 rounded border-slate-300 border-2",
    form: "flex flex-col w-96",
    button: "m-2 cursor-pointer bg-fuchsia-800 text-slate-50 p-1 px-3 rounded transition hover:bg-fuchsia-700",
    label: "px-2 text-sm",
};
const Reset = () => {
    const { id } = useParams();
    const [auth, setAuth] = useState(null);
    useEffect(() => {
        async function getData() {
            try {
                const { data } = await axios.get(process.env.REACT_APP_BACKEND_URL + "/auth/" + id);
                if (data.auth) setAuth(data.auth);
            } catch (error) {
                console.log(error);
            }
        }
        getData();
    }, [id]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { password, password2 } = e.target.elements;
        if (password.value !== password2.value) {
            alert("Passwords do not match");
            password.focus();
            return;
        }
        try {
            await axios.put(
                process.env.REACT_APP_BACKEND_URL + "/user/" + auth.authId,
                {
                    password: password.value,
                },
                {
                    withCredentials: true,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                }
            );
            alert("Password Successfully changed");
            setAuth(null);
        } catch (error) {
            console.log(error);
        }
    };
    if (auth) {
        return (
            <div className="flex items-center justify-center m-10">
                <form onSubmit={handleSubmit} className={classes.form} encType="multipart/form-data">
                    <label htmlFor="password" className={classes.label}>
                        Password
                    </label>
                    <input name="password" type="password" id="password" className={classes.input} placeholder="Enter your password" />
                    <label htmlFor="password2" className={classes.label}>
                        Re-type Password
                    </label>
                    <input name="password2" type="text" id="password2" className={classes.input} placeholder="Re-type your password" />

                    <input type="submit" value="Reset Password" className={classes.button} />
                </form>
            </div>
        );
    } else {
        return <div className="flex items-center justify-center m-10 text-lg text-red-900">Not Found</div>;
    }
};

export default Reset;
