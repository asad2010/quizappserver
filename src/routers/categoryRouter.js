const express = require('express')
const router = express.Router()
const categoryCtrl = require("../controller/categoryCtrl")

router.get("/categories", categoryCtrl.viewCategories)
router.get("/categories/:id", categoryCtrl.viewOneCategory)
router.post("/categories", categoryCtrl.addCategory)
router.delete('/categories/:id', categoryCtrl.delCategory)

module.exports = router