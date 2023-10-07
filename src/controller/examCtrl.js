const Exams = require("../model/examModel");
const Questions = require("../model/questionModel")
const examCtrl = {
    viewExams: async (req, res) => {
        try {
            const exams = await Exams.find();
            res.status(200).send(exams)
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: "Something went wrong..." })
        }
    },

    viewOneExams: async (req, res) => {
        const { id } = req.params;
        try {
            const {questionsCount} = req.body;
            const exam = await Exams.findById(id);
            const questions = await Questions.aggregate([
                { $match: { category: exam.category } },
                { $sample: { size: questionsCount * 1 } }
              ])
            exam.questions = questions;
            if (exam) return res.status(200).send(exam)
            
            res.status(404).send({ message: "Exam not found" })
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: "Something went wrong..." })
        }
    },

    addExam: async (req, res) => {
        const { examName } = req.body;
        try {
            const examExists = await Exams.findOne({ examName })
            if (examExists )return res.status(400).send({ message: "Exam already exists" });
            const examNew = Exams.create(req.body)
            res.status(200).send({ message: "Exam created successfully", exam: examNew })
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: error.message })
        }
    },

    updExam: async (req, res) => {
        const { id } = req.params;
        const { examName } = req.body;
        try {
            const examExists = await Exams.findOne({ examName });
            if (examExists) return res.status(400).send({ message: `Exam already exists` });
            const updateExam = await Exams.findByIdAndUpdate(id, req.body, { new: true });
            if (!updateExam) return res.status(404).send({ message: "Exam not found" })
            res.status(200).send({ message: "Exam update successfully", exam: updateExam })
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Something went wrong" });
        }
    },

    delExam: async (req, res) => {
        const { id } = req.params;
        try {
            const deletedExam = await Exams.findByIdAndDelete(id);
            if (!deletedExam) return res.status(404).send({ message: "Exam not found" })
            res.status(200).send({ message: "Exam deleted successfully" })
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: "Something went wrong..." })
        }
    }
}

module.exports = examCtrl