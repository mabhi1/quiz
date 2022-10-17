const express = require("express");
const router = express.Router();
const quizzes = require("../data/quizzes");
const validator = require("../validator/validator");

router.get("/", async (req, res) => {
    try {
        const quizList = await quizzes.getAllQuizzes();
        res.status(200).json({ quizList: quizList });
    } catch (error) {
        res.status(400).json({ error: error });
    }
});

router.post("/", async (req, res) => {
    try {
        name = req.body.name;
        validator.stringValidator("name", name);
        const quiz = await quizzes.createQuiz(name);
        res.status(200).json({ quiz: quiz });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        validator.stringValidator("id", id);
        const quiz = await quizzes.getQuizById(id);
        res.status(200).json({ quiz: quiz });
    } catch (error) {
        res.status(400).json({ error: error });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        validator.stringValidator("id", id);
        const quiz = await quizzes.deleteQuizById(id);
        res.status(200).json({ quiz: quiz });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        validator.stringValidator("id", id);
        const questions = req.body.questions;
        const totalQuestions = null;
        if (questions) totalQuestions = req.body.questions.length;
        const courseLink = req.body.courseLink;
        const quiz = await quizzes.updateQuizById(id, totalQuestions, questions, courseLink);
        res.status(200).json({ updatedQuiz: quiz });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

module.exports = router;
