import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    useEffect(() => {
        if (user === null) navigate("/signin");
    }, [navigate, user]);
    if (user !== null && user !== "nouser") {
        return <div>Profile</div>;
    }
};

export default Profile;
