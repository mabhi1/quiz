import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Quizzes from "./Quizzes";
import Users from "./Users";

const Dashboard = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    useEffect(() => {
        if (user === null) navigate("/", { replace: true });
    }, [navigate, user]);
    if (user && user.firstName === "admin") {
        return (
            <div className="flex md:flex-row flex-col w-full">
                <Users />
                <Quizzes />
            </div>
        );
    }
};

export default Dashboard;
