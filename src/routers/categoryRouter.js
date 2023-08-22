const express = require('express')
const router = express.Router()
const categoryCtrl = require("../controller/categoryCtrl")

router.get("/admin/categories", categoryCtrl.viewCategories)
router.get("/admin/categories/:id", categoryCtrl.viewOneCategory)
router.post("/admin/categories", categoryCtrl.addCategory)
router.delete('/admin/categories/:id', categoryCtrl.delCategory)

module.exports = router