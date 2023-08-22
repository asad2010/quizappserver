const mongoose = require('mongoose')

const HistorySchema = new mongoose.Schema({
    examName: {type: String, required: true},
    questionsCount: {type: String, required: true},
    date: {type: mongoose.Schema.Types.Date},
    solved: {type: Number, required: true},
    solvedProcent: {type: Number, required: true},
    status: {type: Boolean, default: false}
})

module.exports = mongoose.model("History", HistorySchema)
