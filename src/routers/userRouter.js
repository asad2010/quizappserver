const express = require('express')
const router = express.Router()
const userCtrl = require("../controller/userCtrl")

//get
router.get("/profile/:id", userCtrl.viewProfile)
router.get("/admin/teachers", userCtrl.viewTeachers)
router.get("/admin/students", userCtrl.viewStudents)

// update
router.patch("/profile/:id", userCtrl.updUser)
router.patch("/admin/students/allow/:id", userCtrl.allowUser)
router.patch("/admin/students/unallow/:id", userCtrl.unAllowUser)

//delete
router.delete("/admin/users/:id", userCtrl.delUser)

module.exports = router;
