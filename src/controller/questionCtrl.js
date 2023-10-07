const Questions = require("../model/questionModel")
const Categories = require("../model/categoryModel");
const mongoose = require('mongoose')
const questionCtrl = {
    viewQuestions: async (req, res) => {
        try {
            const questions = await Questions.find()
            res.status(200).send(questions)
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: "Something went wrong..." })
        }
    },
    viewOneQuestion: async (req, res) => {
        try {
            const { id } = req.params;
            const category = await Categories.aggregate([
                { $match: { _id: new mongoose.Types.ObjectId(id) } },
                {
                    $lookup:
                    {
                        from: "questions",
                        localField: "_id",
                        foreignField: "category",
                        as: "questions"

                    }
                }
            ]);

            if (!category) return res.status(404).send({ message: "Question not found" })
            res.status(200).send(category)
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: "Something went wrong..." })
        }
    },
    addQuestion: async (req, res) => {
        try {
            const { questionText, category } = req.body;
            const findCategory = await Categories.findOne({ _id: category })
            if (!findCategory) return res.status(404).send({ message: "Category not found" })
            const isExists = await Questions.findOne({ questionText })
            if (isExists) return res.status(402).send({ message: "This question already exists!" })
            const newQuestion = await Questions.create(req.body)            
            res.status(201).send({ message: "Question created successfully", question: newQuestion })
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: "Something went wrong" })
        }
    },

    updQuestion: async (req, res) => {
        const { id } = req.params;
        try {
            const updateQuestion = await Questions.findByIdAndUpdate(id, req.body, {new: true})
            if(updateQuestion) {
                return res.status(200).send({message: "Update question successfully", question: updateQuestion})
            }
        } catch (error) {
            console.error(error)
            res.status(500).send({message: "Something went wrong"})
        }
    },

    delQuestion: async (req, res) => {
        const { id } = req.params;
        try {
            const question = await Questions.findById(id);
            if(!question) return res.status(404).send({message: "Question not found"})
            await Questions.findByIdAndDelete(id);
            res.status(200).send({message: "Question deleted successfully"})
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: "Something went wrong..." })
        }
    },

}

module.exports = questionCtrl
