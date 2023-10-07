const express = require('express')
const router = express.Router()
const examCtrl = require("../controller/examCtrl")

router.get("/exams/", examCtrl.viewExams)
router.get("/exams/:id", examCtrl.viewOneExams)
router.post("/admin/exams", examCtrl.addExam)
router.delete("/admin/exams/:id", examCtrl.delExam)

module.exports = router