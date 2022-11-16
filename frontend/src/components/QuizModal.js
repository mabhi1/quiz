import React, { useState } from "react";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import actions from "../actions";

Modal.setAppElement("#root");
const customStyles = {
    content: {
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        marginRight: "0",
    },
};
const QuizModal = ({ setIsOpen, modalIsOpen, quizData, time, setTime }) => {
    const dispatch = useDispatch();
    const [current, setCurrent] = useState(0);
    const [marks, setMarks] = useState([]);
    const user = useSelector((state) => state.user);

    const afterOpenModal = async () => {
        setTime(quizData.questions.length * 10);
        setCurrent(0);
        setMarks([]);
        const timer = setInterval(() => {
            setTime((time) => {
                if (time <= 0) {
                    setIsOpen(false);
                    clearInterval(timer);
                } else {
                    return time - 1;
                }
            });
        }, [1000]);
        try {
            const { data } = await axios.put(
                process.env.REACT_APP_BACKEND_URL + "/user/" + user._id,
                {
                    quiz: {
                        _id: quizData._id,
                        marks: 0,
                        takenOn: Date.now(),
                    },
                },
                {
                    withCredentials: true,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                }
            );
            dispatch(actions.signIn(data.updatedUser));
        } catch (error) {
            console.log(error);
        }
    };
    const afterCloseModal = async () => {
        alert("Test submitted successfully");
        let score = 0;
        for (let i = 0; i < marks.length; i++) {
            if (quizData.questions[i].answer === parseInt(marks[i]) + 1) {
                score++;
            }
        }
        try {
            const { data } = await axios.put(
                process.env.REACT_APP_BACKEND_URL + "/user/" + user._id,
                {
                    quiz: {
                        _id: quizData._id,
                        marks: score,
                        takenOn: Date.now(),
                    },
                },
                {
                    withCredentials: true,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                }
            );
            dispatch(actions.signIn(data.updatedUser));
        } catch (error) {
            console.log(error);
        }
    };
    const handleAnswer = (e) => {
        e.preventDefault();
        const answer = e.target.elements.answer;
        if (!answer.value) {
            alert("Please select an answer to contnue");
            return;
        }
        setCurrent((current) => {
            return current + 1;
        });
        marks.push(answer.value);
        if (marks.length === quizData.questions.length) {
            setIsOpen(false);
        }
    };
    return (
        <Modal
            isOpen={modalIsOpen}
            onAfterClose={afterCloseModal}
            onAfterOpen={afterOpenModal}
            onRequestClose={handleAnswer}
            style={customStyles}
            contentLabel="Example Modal"
            className="flex flex-col items-center bg-blue-50 gap-10 pt-10 text-lg font-['Helvetica']"
        >
            <div>
                <img src={quizData.imageLink} alt={quizData.name} width="50px" height="50px" />
                <h2>{quizData.name}</h2>
            </div>
            <div>Time left : {time} seconds</div>
            <div>
                Question{current + 1} : {quizData.questions[current]?.question}
                <form onSubmit={handleAnswer}>
                    {quizData.questions[current]?.options.map((option, idx) => {
                        return (
                            <div className="mt-5" key={option}>
                                <input type="radio" id={option} name="answer" value={idx} />
                                <label htmlFor={option} className="ml-3">
                                    {option}
                                </label>
                            </div>
                        );
                    })}

                    {current <= quizData.questions.length - 2 ? (
                        <button type="submit" className="mt-8 bg-fuchsia-900 text-slate-100 px-8 py-1 rounded shadow hover:bg-fuchsia-700">
                            Next
                        </button>
                    ) : (
                        <button type="submit" className="mt-8 bg-green-700 text-slate-100 px-3 py-1 rounded shadow hover:bg-green-600">
                            Submit
                        </button>
                    )}
                </form>
            </div>
        </Modal>
    );
};

export default QuizModal;
