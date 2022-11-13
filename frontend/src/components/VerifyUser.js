import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const VerifyUser = () => {
    const { id } = useParams();
    const [verify, setVerify] = useState(false);
    const [message, setMessage] = useState(undefined);
    useEffect(() => {
        async function verifyUser() {
            try {
                const { data } = await axios.get(process.env.REACT_APP_BACKEND_URL + "/user/verify/" + id);
                setVerify(true);
            } catch (error) {
                if (error.response.data.error === "User already verified") {
                    setMessage("User already verified");
                } else {
                    setMessage("Unable to verify user");
                }
                setVerify(false);
            }
        }
        verifyUser();
    }, [id]);
    if (verify) {
        return <div className="text-center text-lg text-green-900">User verified successfully</div>;
    } else if (message) {
        return <div className="text-center text-lg text-red-900">{message}</div>;
    }
};

export default VerifyUser;
