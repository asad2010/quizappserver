const Questions = require("../model/questionModel")
const Categories = require("../model/categoryModel");

const questionCtrl = {
    viewQuestions: async (req, res) => {
        try {
            const questions = await Questions.find()
            res.send(questions)
        } catch (error) {
            console.error(error)
            res.status(500).send({message: "Something went wrong..."})
        }
    },
    viewOneQuestion: async (req,res) => {
        try {
            const {id} = req.params;
            const question = await Questions.findOne({id})
            if(!question) return res.status(404).send({message: "Question not found"})
            res.send(question)
        } catch(error){
            console.error(error)
            res.status(500).send({message: "Something went wrong..."})
        }
    },
    addQuestion: async (req, res) => {
        try {
            const newQuestion = await Questions.create(
                req.body
            )
            const category = await Categories.findOne({_id: newQuestion.category})
            if(!category) return res.status(404).send({message: "Category not found"})
            await Categories.findOneAndUpdate({_id: newQuestion.category},{$push: {questions: newQuestion}})
            res.send({ message: "Question created successfully" })
        } catch (error) {
            console.error(error)
            res.send({ message: "Something went wrong" })
        }
    },
    delQuestion: async (req, res) => {
        const { id } = req.params;
        try {
            const categoryOne = await Categories.find();
            const category = await Categories.findOne({_id: {$in: categoryOne}})
            console.log(category)
            if(!category) return res.status(404).send({message: "Category not found"})
            // await Questions.findByIdAndDelete(id)
            res.send({ message: "Question deleted successfully" })
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: "Something went wrong..." })
        }
    },

}

module.exports = questionCtrl