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
    addExam: async (req,res) => {
        try {
            const {examName, questionsCount, time} = req.body;
            const questions = await Questions.aggregate([{ $sample: { size: questionsCount * 1 } }]);
            const exam = await Exams.create({
                examName,
                questionsCount,
                time,
                questions
            })
            res.status(201).send({message: "Exam successfully added", exam})
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: "Something went wrong..." })
        }
    },
    delExam: async (req, res) => {
        const { id } = req.params;
        try {
            await Exams.findByIdAndDelete(id)
            res.status(200).send({ message: "Exam deleted successfully" })
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: "Something went wrong..." })
        }
    }
}

module.exports = examCtrl