const express = require('express')
const router = express.Router()
const questionCtrl = require("../controller/questionCtrl")

router.post("/", questionCtrl.addQuestion)
router.delete("/:id", questionCtrl.delQuestion)


module.exports = router