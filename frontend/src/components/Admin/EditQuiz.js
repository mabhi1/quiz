import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const classes = {
    label: "block",
    input: "p-1 px-2 rounded mr-2 bg-slate-200 mb-5 md:w-96",
    input2: "p-1 px-2 rounded mr-2 bg-slate-200 mb-5",
};
const EditQuiz = () => {
    const { id } = useParams();
    const [quiz, setQuiz] = useState(null);
    useEffect(() => {
        async function getData() {
            try {
                let { data } = await axios.get(process.env.REACT_APP_BACKEND_URL + "/quiz/" + id);
                setQuiz(data.quiz);
            } catch (error) {
                setQuiz({});
            }
        }
        getData();
    }, [id]);
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    useEffect(() => {
        if (user === null) navigate("/", { replace: true });
    }, [navigate, user]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const courseLink = document.getElementById("courseLink").value;
        const imageLink = document.getElementById("imageLink").value;
        if (name === "" || courseLink === "" || imageLink === "") {
            alert("All fields must be filled");
            return;
        }
        let temp = { ...quiz };
        temp.name = name;
        temp.courseLink = courseLink;
        temp.imageLink = imageLink;
        if (!temp.questions || temp.questions.length === 0) {
            alert("Quiz must have atleast one question");
            return;
        }
        if (id === "new") {
            try {
                const { data } = await axios.post(
                    process.env.REACT_APP_BACKEND_URL + "/quiz",
                    { questions: temp.questions, courseLink: temp.courseLink, imageLink: temp.imageLink, name: temp.name },
                    {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        withCredentials: true,
                    }
                );
                navigate("/dashboard", data);
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const { data } = await axios.put(
                    process.env.REACT_APP_BACKEND_URL + "/quiz/" + id,
                    { questions: temp.questions, courseLink: temp.courseLink, imageLink: temp.imageLink, name: temp.name },
                    {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        withCredentials: true,
                    }
                );
                navigate("/dashboard", data);
            } catch (error) {
                console.log(error);
            }
        }
    };
    const handleCancel = () => {
        navigate("/dashboard");
    };
    const handleAdd = () => {
        const newName = document.getElementById("newName").value;
        const newAnswer = document.getElementById("newAnswer").value;
        const newOption1 = document.getElementById("newOption1").value;
        const newOption2 = document.getElementById("newOption2").value;
        const newOption3 = document.getElementById("newOption3").value;
        const newOption4 = document.getElementById("newOption4").value;
        if (newName === "" || newAnswer === "" || newOption1 === "" || newOption2 === "" || newOption3 === "" || newOption4 === "") {
            alert("Question and options can not be blank");
            return;
        }
        const newQuestion = { question: newName, answer: newAnswer, options: [newOption1, newOption2, newOption3, newOption4] };
        let temp = { ...quiz };
        if (!temp.questions) {
            temp.questions = [];
        }
        temp.questions.push(newQuestion);
        setQuiz(temp);
        alert("Question added successfully");
        document.getElementById("newName").value = "";
        document.getElementById("newAnswer").value = 1;
        document.getElementById("newOption1").value = "";
        document.getElementById("newOption2").value = "";
        document.getElementById("newOption3").value = "";
        document.getElementById("newOption4").value = "";
    };
    const handleDelete = (index) => {
        let temp = { ...quiz };
        temp.questions.splice(index, 1);
        setQuiz(temp);
        alert("Question successfully deleted");
    };
    const showQuestions = (question, idx) => {
        return (
            <li key={idx} className="p-5">
                <label htmlFor="question" className={classes.label}>
                    Question {idx + 1}
                </label>
                <input type="text" defaultValue={question.question} name={question} className={classes.input} />
                <label htmlFor="options" className={classes.label}>
                    Options :
                </label>
                <ul className="flex md:flex-row flex-col">
                    {question.options?.map((option, idx) => {
                        return (
                            <li key={idx}>
                                <input type="text" defaultValue={option} name={option} className={classes.input2} />
                            </li>
                        );
                    })}
                </ul>
                <label htmlFor="options">Correct Option :</label>
                <select name="answer" id="answer" defaultValue={question.answer} className={classes.input2 + " ml-5"}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
                <button className="p-1 px-2 bg-red-800 rounded shadow text-slate-50" onClick={() => handleDelete(idx)}>
                    Delete Question
                </button>
            </li>
        );
    };
    if (user && user.firstName === "admin") {
        return (
            <div>
                <form className="w-full" onSubmit={handleSubmit}>
                    <label htmlFor="name" className={classes.label}>
                        Name
                    </label>
                    <input type="text" id="name" name="name" className={classes.input} defaultValue={quiz && quiz.name} />
                    <br />
                    <label htmlFor="course" className={classes.label}>
                        Course Link
                    </label>
                    <input type="text" id="courseLink" name="course" className={classes.input} defaultValue={quiz && quiz.courseLink} />

                    <br />
                    <label htmlFor="questions" className={classes.label + " mb-5"}>
                        Questions
                    </label>
                    <ul className="ml-12 bg-slate-100 border p-5 h-96 overflow-y-scroll divide-y-2 divide-slate-400 rounded">
                        <h2 className="text-center text-slate-900">Scroll to bottom to add a question</h2>
                        {quiz?.questions?.map((question, idx) => showQuestions(question, idx))}
                        <li className="p-5">
                            <label htmlFor="question" className={classes.label}>
                                New Question
                            </label>
                            <input type="text" name="question" id="newName" className={classes.input} />
                            <label htmlFor="options" className={classes.label}>
                                Options :
                            </label>
                            <ul className="flex">
                                <li>
                                    <input type="text" id="newOption1" name="option1" className={classes.input2} />
                                    <input type="text" id="newOption2" name="option2" className={classes.input2} />
                                    <input type="text" id="newOption3" name="option3" className={classes.input2} />
                                    <input type="text" id="newOption4" name="option4" className={classes.input2} />
                                </li>
                            </ul>
                            <label htmlFor="options">Correct Option :</label>
                            <select name="answer" id="newAnswer" className={classes.input2 + " ml-5"}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                            <button type="button" className="p-1 px-2 bg-green-800 rounded shadow text-slate-50" onClick={() => handleAdd()}>
                                Add Question
                            </button>
                        </li>
                    </ul>

                    <br />
                    <label htmlFor="image" className={classes.label}>
                        Image Link
                    </label>
                    <input type="text" id="imageLink" name="image" className={classes.input} defaultValue={quiz && quiz.imageLink} />
                    <span className="flex">
                        <input type="submit" value="Save" className="cursor-pointer m-2 p-2 px-3 bg-green-800 rounded shadow text-slate-50" />
                        <button type="button" className="m-2 p-2 px-3 bg-red-800 rounded shadow text-slate-50" onClick={handleCancel}>
                            Cancel
                        </button>
                    </span>
                </form>
            </div>
        );
    }
};

export default EditQuiz;
