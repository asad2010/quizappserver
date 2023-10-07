const express = require('express')
const router = express.Router()
const questionCtrl = require("../controller/questionCtrl")

router.get("/", questionCtrl.viewQuestions)
router.get("/:id", questionCtrl.viewOneQuestion)
router.post("/", questionCtrl.addQuestion)
router.delete("/:id", questionCtrl.delQuestion)
router.patch("/:id", questionCtrl.updQuestion)



module.exports = router