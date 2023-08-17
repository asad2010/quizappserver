const mongoose = require('mongoose')

const GroupSchema = new mongoose.Schema({
    groupName: {type: String, required: true},
    teacher: {type: String, required: true},
    company: {type: String, required: true},
    allow: {type: Boolean, default: false}
})
module.exports = mongoose.model("Group", GroupSchema)