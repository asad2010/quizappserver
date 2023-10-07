const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    categoryName: {type: String, required: true},
    categoryImg: {type: Object, default: ""}
})
module.exports = mongoose.model("Category", CategorySchema)