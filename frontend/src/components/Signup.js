import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    useEffect(() => {
        if (user) navigate("/profile", { replace: true });
    }, [navigate, user]);
    return <div>Signup</div>;
};

export default Signup;
