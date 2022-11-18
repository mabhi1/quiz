import React, { useEffect, useState } from "react";
import axios from "axios";
import QuizData from "./QuizData";

const FrontPage = () => {
    const [data, setData] = useState(undefined);
    const [searchData, setSearchData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    useEffect(() => {
        async function getAxios() {
            const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/quiz`);
            setData(data);
        }
        getAxios();
    }, []);

    const handleChange = (e) => {
        let temp = [];
        const input = e.target.value.toLowerCase();
        for (let quiz of data.quizList) {
            const name = quiz.name.toLowerCase();
            if (name.includes(input)) temp.push(quiz);
        }
        setSearchTerm(input);
        setSearchData(temp);
    };

    return (
        <div>
            <input type="text" name="search" className="w-full border-2 rounded p-1 px-2" placeholder="Search Quizzes" onChange={handleChange} />
            {searchTerm.length > 0 ? <QuizData quizzes={searchData} /> : <QuizData quizzes={data?.quizList} />}
        </div>
    );
};

export default FrontPage;
