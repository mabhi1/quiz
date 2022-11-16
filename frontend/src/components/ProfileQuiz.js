import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiLinkExternal } from "react-icons/bi";

const ProfileQuiz = ({ quiz }) => {
    const [quizData, setQuizData] = useState(null);
    useEffect(() => {
        async function getData() {
            const { data } = await axios.get(process.env.REACT_APP_BACKEND_URL + "/quiz/" + quiz._id);
            setQuizData(data.quiz);
        }
        getData();
    }, [quiz._id]);
    return (
        <tr>
            <td>{quizData?.name}</td>
            <td>{quiz.marks}</td>
            <td>{quiz.takenOn.split("T")[0]}</td>
            <td>
                <a href={quizData?.courseLink} target="_blank" rel="noreferrer">
                    <BiLinkExternal className="m-auto text-blue-800" />
                </a>
            </td>
        </tr>
    );
};

export default ProfileQuiz;
