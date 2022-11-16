import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import QuizModal from "./QuizModal";

const QuizPage = () => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    useEffect(() => {
        if (user === null) navigate("/");
    });
    const [lastTest, setLastTest] = useState(null);
    const [quizData, setQuizData] = useState(undefined);
    const [time, setTime] = useState(0);

    useEffect(() => {
        async function getData() {
            const { data } = await axios.get(process.env.REACT_APP_BACKEND_URL + "/quiz/" + id);
            setQuizData(data.quiz);
        }
        getData();
    }, [id]);
    useEffect(() => {
        for (let i = 0; i < user.quizzes?.length; i++) {
            if (user.quizzes[i]?._id === quizData?._id) {
                setLastTest({
                    lastAttempted: user.quizzes[i].takenOn,
                    lastScore: user.quizzes[i].marks,
                });

                break;
            }
        }
    }, [quizData?._id, user?.quizzes]);
    const triggerModal = () => {
        const ans = window.confirm(
            "Once the quiz is started, you cannot return utill the timer gets over or you click submit.\nPress OK to start the quiz or cancel to exit."
        );
        if (ans) setIsOpen(true);
    };
    if (user && quizData) {
        return (
            <div className="flex flex-col items-center gap-y-8">
                <h3 className="text-lg underline">{quizData.name}</h3>
                <div>
                    Learn {quizData.name} tutorials at{" "}
                    <a href={quizData.courseLink} target="_blank" rel="noreferrer" className="text-blue-800 underline">
                        {quizData.courseLink}
                    </a>
                </div>
                <div>Total Questions : {quizData.totalQuestions}</div>
                <p className="text-center">
                    You have {quizData.totalQuestions * 10} seconds to complete the quiz.
                    <br /> You are only allowed to take this quiz once per day.
                </p>
                {lastTest && (
                    <p className="flex w-64 justify-between">
                        <span>
                            <span className="underline underline-offset-4">Last attempt</span> : {lastTest.lastAttempted.split("T")[0]}
                        </span>
                        <span>
                            <span className="underline underline-offset-4">Score</span>: {lastTest.lastScore}
                        </span>
                    </p>
                )}

                {!lastTest?.lastAttempted || new Date(lastTest?.lastAttempted).getTime() < Date.now() - 1000 * 60 * 60 * 24 ? (
                    <button className="bg-green-700 text-slate-100 px-3 py-1 rounded shadow hover:bg-green-600" onClick={triggerModal}>
                        Start quiz
                    </button>
                ) : (
                    <button className="bg-slate-400 text-slate-100 px-3 py-1 rounded shadow cursor-not-allowed" disabled={true}>
                        Start quiz
                    </button>
                )}
                <QuizModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} quizData={quizData} time={time} setTime={setTime} />
            </div>
        );
    }
};

export default QuizPage;
