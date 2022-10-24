import React from "react";
import { FaHome, FaUserPlus, FaUserEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const classes = {
    li: "mx-5 relative",
    icons: "mr-1",
    a: "flex items-center after:content-[''] after:absolute after:bg-slate-900 dark:after:bg-slate-50 after:h-0.5 after:left-0 after:w-0 after:top-6 after:transition-all after:duration-300 hover:after:w-full",
};
const Navbar = () => {
    return (
        <>
            <img src="https://quadlayers.com/wp-content/uploads/2020/02/quiz-plugins-for-WordPress.png" alt="quiz app" width="150px" />
            <nav>
                <ul className="flex cursor-pointer">
                    <li className={classes.li}>
                        <Link to="/" className={classes.a}>
                            <FaHome className={classes.icons} />
                            Home
                        </Link>
                    </li>
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
                </ul>
            </nav>
        </>
    );
};

export default Navbar;
