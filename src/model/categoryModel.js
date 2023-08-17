const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    categoryName: {type: String, required: true},
    categoryImg: {type: Object, default: ""},
    questions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Question'}]
})
module.exports = mongoose.model("Category", CategorySchema)