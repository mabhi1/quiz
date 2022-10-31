import React, { useEffect, useState } from "react";
import axios from "axios";
import QuizData from "./QuizData";
import { useNavigate } from "react-router-dom";

const Quizzes = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(undefined);
    const [searchData, setSearchData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    useEffect(() => {
        async function getAxios() {
            const { data } = await axios.get(process.env.REACT_APP_BACKEND_URL + "/quiz");
            setData(data.quizList);
        }
        getAxios();
    }, []);

    const handleChange = (e) => {
        let temp = [];
        const input = e.target.value.toLowerCase();
        for (let quiz of data) {
            const name = quiz.name.toLowerCase();
            if (name.includes(input)) temp.push(quiz);
        }
        setSearchTerm(input);
        setSearchData(temp);
    };

    return (
        <div className="w-full">
            <button
                onClick={() => navigate("/edit/new")}
                className="text-slate-500 bg-slate-50 p-2 px-3 hover:border-slate-500 hover:text-slate-900 hover:bg-slate-200 border-2 border-slate-200 rounded transition hover:bg-slate-100 ml-2 mr-5"
            >
                Add a quiz
            </button>
            <input type="text" name="search" className="border-2 rounded p-2 w-1/2" placeholder="Search Quizzes" onChange={handleChange} />
            {searchTerm.length > 0 ? (
                <QuizData quizzes={searchData} setSearchData={setSearchData} setData={setData} />
            ) : (
                <QuizData quizzes={data} setSearchData={setSearchData} setData={setData} />
            )}
        </div>
    );
};

export default Quizzes;
