const express = require('express')
const router = express.Router()
const userCtrl = require("../controller/userCtrl")


router.get("/student", userCtrl.viewExams)
router.get("/student/profile", userCtrl.viewProfile)
router.get("/student/exams", userCtrl.viewExams)

router.get("/admin/categories", userCtrl.viewCategories)
router.get("/admin/categories/:categoryName", userCtrl.viewOneCategory)


module.exports = router;
