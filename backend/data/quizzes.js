const quizSchema = require("../models/quizzes");
const validator = require("../validator/validator");

const getQuizById = async (id) => {
    try {
        validator.stringValidator("id", id);
        const quiz = await quizSchema.findById(id);
        validator.emptyValidator(quiz, "No quiz found");
        return quiz;
    } catch (error) {
        throw "No quiz found";
    }
};

const getAllQuizzes = async () => {
    try {
        const quizzes = await quizSchema.find({});
        return quizzes;
    } catch (error) {
        throw "No quizzes found";
    }
};

const createQuiz = async (name) => {
    try {
        validator.stringValidator("quiz name", name);
        const quiz = await quizSchema.create({
            name: name,
        });
        validator.emptyValidator(quiz, "Could not create quiz");
        return quiz;
    } catch (error) {
        throw "Could not create quiz";
    }
};

const deleteQuizById = async (id) => {
    try {
        const quiz = await getQuizById(id);
        await quizSchema.deleteOne({ _id: id });
        return quiz;
    } catch (error) {
        throw "Invalid quiz";
    }
};

const updateQuizById = async (id, totalQuestions, questions, courseLink) => {
    try {
        const quiz = await getQuizById(id);
        if (totalQuestions) quiz.totalQuestions = totalQuestions;
        if (questions) quiz.questions = questions;
        if (courseLink) quiz.courseLink = courseLink;
        await quiz.save();
        return quiz;
    } catch (error) {
        throw "Could not update quiz";
    }
};

module.exports = {
    getQuizById,
    createQuiz,
    getAllQuizzes,
    deleteQuizById,
    updateQuizById,
};
