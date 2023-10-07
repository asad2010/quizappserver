const mongoose = require('mongoose')

const ExamSchema = new mongoose.Schema({
    examName: {type: String, required: true},
    questionsCount: {type: Number, required: true, min: 1},
    time: {type: Number, required: true}, 
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
})
module.exports = mongoose.model("Exam", ExamSchema)
