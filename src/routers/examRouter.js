const express = require('express')
const router = express.Router()
const examCtrl = require("../controller/examCtrl")

router.get("/exams/", examCtrl.viewExams)
router.delete("/exams/:id", examCtrl.delExam)
router.post("/admin/exams", examCtrl.addExam)

module.exports = router