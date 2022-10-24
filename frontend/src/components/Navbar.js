import React, { useEffect } from "react";
import { FaHome, FaUserPlus, FaUserEdit, FaUserAlt, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import actions from "../actions";
import axios from "axios";

const classes = {
    li: "mx-5 relative",
    icons: "mr-1",
    a: "flex items-center after:content-[''] after:absolute after:bg-slate-900 dark:after:bg-slate-50 after:h-0.5 after:left-0 after:w-0 after:top-6 after:transition-all after:duration-300 hover:after:w-full",
};
const Navbar = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    useEffect(() => {
        async function getAxios() {
            try {
                const { data } = await axios.get("http://localhost:4000/auth/user", { withCredentials: true });
                dispatch(actions.signIn(data.loggedUser));
            } catch (error) {
                dispatch(actions.signOut());
                // console.log(error);
            }
            // dispatch(actions.signIn);
        }
        getAxios();
    }, [dispatch]);
    const handleLogout = async () => {
        try {
            await axios.get("http://localhost:4000/auth/logout", { withCredentials: true });
            dispatch(actions.signOut());
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <img src="https://quadlayers.com/wp-content/uploads/2020/02/quiz-plugins-for-WordPress.png" alt="quiz app" width="150px" />
            <nav>
                <ul className="flex cursor-pointer">
                    {user && <li className={classes.li}>Welcome, {user.firstName}</li>}
                    <li className={classes.li}>
                        <Link to="/" className={classes.a}>
                            <FaHome className={classes.icons} />
                            Home
                        </Link>
                    </li>
                    {user ? (
                        <>
                            <li className={classes.li}>
                                <Link to="/profile" className={classes.a}>
                                    <FaUserAlt className={classes.icons} />
                                    Profile
                                </Link>
                            </li>
                            <li className={classes.li}>
                                <button onClick={handleLogout} className={classes.a}>
                                    <FaSignOutAlt className={classes.icons} />
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className={classes.li}>
                                <Link to="/signin" className={classes.a}>
                                    <FaUserEdit className={classes.icons} />
                                    Sign In
                                </Link>
                            </li>
                            <li className={classes.li}>
                                <Link to="/signup" className={classes.a}>
                                    <FaUserPlus className={classes.icons} />
                                    Sign Up
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </>
    );
};

export default Navbar;
