const express = require('express')
const router = express.Router()
const examCtrl = require("../controller/examCtrl")

router.get("/exams/", examCtrl.viewExams)
router.delete("/exams/", examCtrl.delExam)
// router.get("/admin/exams/:id", examCtrl.viewOneExam)
router.post("/admin/exams", examCtrl.addExam)

module.exports = router