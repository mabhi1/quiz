import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import actions from "../actions";
import ProfileQuiz from "./ProfileQuiz";
import { FaFontAwesome } from "react-icons/fa";

const classes = {
    input: "p-1 px-2 border border-slate-900 mr-5",
    button: "transition p-1 px-2 rounded text-slate-50 cursor-pointer",
    green: "bg-green-800 hover:bg-green-600",
    fuchsia: "bg-fuchsia-800 hover:bg-fuchsia-600",
};
const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    useEffect(() => {
        if (user === null) navigate("/signin");
    }, [navigate, user]);
    const handleEdit = () => {
        const profileForm = document.getElementById("profile");
        profileForm.classList.toggle("hidden");
    };
    const handleProfile = async (e) => {
        e.preventDefault();
        const { firstName, lastName } = e.target.elements;
        try {
            const { data } = await axios.put(
                process.env.REACT_APP_BACKEND_URL + "/user/" + user._id,
                {
                    firstName: firstName.value,
                    lastName: lastName.value,
                },
                {
                    withCredentials: true,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                }
            );
            dispatch(actions.signIn(data.updatedUser));
            document.getElementById("profile").classList.toggle("hidden");
            alert("Profile Successfully updated");
        } catch (error) {
            console.log(error);
        }
    };
    const handleEditPassword = () => {
        const passwordForm = document.getElementById("password");
        passwordForm.classList.toggle("hidden");
    };
    const handlePassword = async (e) => {
        e.preventDefault();
        const { password1, password2 } = e.target.elements;
        if (password1.value !== password2.value) {
            alert("Passwords do not match");
            password1.focus();
            return;
        }
        try {
            const { data } = await axios.put(
                process.env.REACT_APP_BACKEND_URL + "/user/" + user._id,
                {
                    password: password1.value,
                },
                {
                    withCredentials: true,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                }
            );
            dispatch(actions.signIn(data.updatedUser));
            document.getElementById("password").classList.toggle("hidden");
            alert("Password Successfully changed");
            password1.value = "";
            password2.value = "";
        } catch (error) {
            console.log(error);
        }
    };
    if (user !== null && user !== "nouser") {
        return (
            <div className="p-5 divide-y-2 divide-slate-400">
                <div className="flex w-full justify-between mb-5">
                    <div>
                        <h2>Name : {user.firstName + " " + user.lastName}</h2>
                        <p>Email : {user.email}</p>
                    </div>
                    <div className="flex w-64 justify-between items-center">
                        <button className={classes.button + " " + classes.green} onClick={handleEdit}>
                            Edit Profile
                        </button>
                        <button className={classes.button + " " + classes.fuchsia} onClick={handleEditPassword}>
                            Change Password
                        </button>
                    </div>
                </div>
                <form id="profile" onSubmit={handleProfile} className="p-5 flex justify-between items-center bg-slate-200 my-5 hidden">
                    <div>
                        <label>
                            First Name :{" "}
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                className={classes.input + " w-80"}
                                placeholder="First Name"
                                defaultValue={user.firstName}
                            />
                        </label>
                        <label>
                            Last Name :{" "}
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                className={classes.input + " w-80"}
                                placeholder="Last Name"
                                defaultValue={user.lastName}
                            />
                        </label>
                    </div>
                    <input type="submit" value="Submit" className={classes.button + " " + classes.green} />
                </form>
                <form id="password" onSubmit={handlePassword} className="p-5 flex justify-between items-center bg-slate-200 my-5 hidden">
                    <div>
                        <label>
                            Password :{" "}
                            <input type="password" id="password1" name="password1" className={classes.input + " w-80"} placeholder="Password" />
                        </label>
                        <label>
                            Re-type Password :{" "}
                            <input type="text" id="password2" name="password2" className={classes.input + " w-80"} placeholder="Re-type password" />
                        </label>
                    </div>
                    <input type="submit" value="Submit" className={classes.button + " " + classes.green} />
                </form>
                {user.quizzes.length > 0 ? (
                    <div>
                        <p className="flex mt-5 justify-center">
                            <FaFontAwesome className="m-1" />
                            Attempted Quizzes
                        </p>
                        <table className="my-3 w-full text-center">
                            <thead className="font-medium">
                                <tr className="underline underline-offset-2">
                                    <td>Quiz</td>
                                    <td>Score</td>
                                    <td>Attempted on</td>
                                    <td>Tutorial</td>
                                </tr>
                            </thead>
                            <tbody>
                                {user.quizzes.map((quiz) => {
                                    return <ProfileQuiz quiz={quiz} key={quiz.takenOn} />;
                                })}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center pt-5">No quiz attempted</div>
                )}
            </div>
        );
    }
};

export default Profile;
