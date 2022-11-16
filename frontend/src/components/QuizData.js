import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const classes = {
    li: "flex flex-col justify-between shadow w-[140px] items-center rounded m-5",
    name: "w-full p-2 bg-slate-200 text-center",
    button: "bg-fuchsia-900 text-slate-50 p-2 w-full transition hover:bg-fuchsia-700",
    img: "m-5",
};
const QuizData = ({ quizzes }) => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const handleClick = (id) => {
        if (user === null) {
            alert("You need to login to start a quiz");
            return;
        }
        navigate(`/quiz/${id}`);
    };
    return (
        <ul className="flex m-5">
            {quizzes &&
                quizzes.map((quiz) => {
                    return (
                        <li key={quiz._id} className={classes.li}>
                            <h2 className={classes.name}>{quiz.name}</h2>
                            <img alt={quiz.name} src={quiz.imageLink} height="80px" width="80px" className={classes.img} />
                            <button className={classes.button} onClick={() => handleClick(quiz._id)}>
                                Start Quiz
                            </button>
                        </li>
                    );
                })}
        </ul>
    );
};

export default QuizData;
