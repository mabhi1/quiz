import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const classes = {
    li: "border-2 flex flex-col justify-between shadow-md w-32 items-center rounded md:m-2 m-5",
    name: "w-full p-1 bg-slate-200 text-center",
    button: "bg-fuchsia-900 text-slate-50 p-1 px-2 m-1 rounded transition hover:bg-fuchsia-700",
    img: "m-5",
    btnGroup: "flex w-full justify-evenly",
};
const QuizData = ({ quizzes, setSearchData, setData }) => {
    let navigate = useNavigate();
    const handleDelete = async (quizId) => {
        const input = window.confirm("Are you sure you want to delete the quiz?");
        if (input === true) {
            try {
                await axios.delete(process.env.REACT_APP_BACKEND_URL + "/quiz/" + quizId);
                setData((data) => {
                    return data.filter((quiz) => {
                        return quiz._id !== quizId;
                    });
                });
                setSearchData((searchData) => {
                    return searchData.filter((quiz) => {
                        return quiz._id !== quizId;
                    });
                });
                alert("Quiz successfully deleted");
            } catch (error) {
                console.log(error);
            }
        }
    };
    const handleEdit = (quizId) => {
        navigate("/edit/" + quizId);
    };
    return (
        <ul className="flex mt-1 flex-wrap justify-center md:justify-start">
            {quizzes &&
                quizzes.map((quiz) => {
                    return (
                        <li key={quiz._id} className={classes.li}>
                            <h2 className={classes.name}>{quiz.name}</h2>
                            <img alt={quiz.name} src={quiz.imageLink} height="60px" width="60px" className={classes.img} />
                            <div className={classes.btnGroup}>
                                <button className={classes.button} onClick={() => handleEdit(quiz._id)}>
                                    Edit
                                </button>
                                <button className={classes.button} onClick={() => handleDelete(quiz._id)}>
                                    Delete
                                </button>
                            </div>
                        </li>
                    );
                })}
        </ul>
    );
};

export default QuizData;
