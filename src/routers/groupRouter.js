const express = require('express')
const router = express.Router()
const groupCtrl = require("../controller/groupCtrl")

router.get("/", groupCtrl.viewGroups)
router.post("/", groupCtrl.addGroup)
router.delete("/:id", groupCtrl.delGroup)
router.patch("/:id", groupCtrl.updGroup)

module.exports = router