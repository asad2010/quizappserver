const express = require('express')
const userCtrl = require("../controller/userCtrl")

const router = express.Router()

router.get("/student", userCtrl.viewExams)
router.get("/student/profile", userCtrl.viewProfile)

module.exports = router;
