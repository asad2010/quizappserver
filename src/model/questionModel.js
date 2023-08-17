const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
    question: {type: String, required: true},
    variants: {type: Array, required: true},
    rightVariant: {type: String, required: true},
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
})
module.exports = mongoose.model("Question", QuestionSchema)