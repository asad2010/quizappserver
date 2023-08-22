const Question = require("../model/questionModel")


const questionCtrl = {
    addQuestion: async (req, res) => {
        try {
            const { question, variantOne, variantTwo, variantThree, rightVariant } = req.body;
            const newQuestion = await Questions.create({
                question,
                variantOne,
                variantTwo,
                variantThree,
                rightVariant
            })
            res.send({ message: "Question created successfully" })
        } catch (error) {
            console.error(error)
            res.send({ message: "Something went wrong" })
        }
    },
    delQuestion: async (req, res) => {
        const { id } = req.params;
        try {
            await Questions.findByIdAndDelete(id)
            res.send({ message: "Question deleted successfully" })
        } catch (error) {
            console.error(error)
            res.send({ message: "Something went wrong..." })
        }
    },
   
}

module.exports = questionCtrl