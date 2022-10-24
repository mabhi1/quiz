import React, { useEffect, useState } from "react";
import axios from "axios";

const FrontPage = () => {
    const [data, setData] = useState(undefined);

    useEffect(() => {
        async function getAxios() {
            const { data } = await axios.get("http://localhost:4000/quiz");
            setData(data);
        }
        getAxios();
    }, []);

    return <div>FrontPage{JSON.stringify(data)}</div>;
};

export default FrontPage;
