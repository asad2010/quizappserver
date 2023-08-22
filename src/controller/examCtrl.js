const Exams = require("../model/examModel");
const Questions = require("../model/questionModel")
const examCtrl = {
    viewExams: async (req, res) => {
        try {
            const exams = await Exams.find();
            res.send(exams)
        } catch (error) {
            console.error(error)
            res.send({ message: "Something went wrong..." })
        }
    },
    addExam: async (req,res) => {
        try {
            const {examName, questionsCount, time} = req.body;
            const questions = await QuestionModel.aggregate([{ $sample: { size: questionsCount } }]);
            const exam = Exams.create({
                examName,
                questionsCount,
                time,
                questions
            })
            res.send({message: "Exam successfully added", exam})
        } catch (error) {
            console.error(error)
            res.send({ message: "Something went wrong..." })
        }
    },
    delExam: async (req, res) => {
        const { id } = req.params;
        try {
            await Exams.findByIdAndDelete(id)
            res.send({ message: "Exam deleted successfully" })
        } catch (error) {
            console.error(error)
            res.send({ message: "Something went wrong..." })
        }
    }
}

module.exports = examCtrl