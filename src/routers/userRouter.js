const express = require('express')
const router = express.Router()
const userCtrl = require("../controller/userCtrl")

//get
router.get("/profile/:id", userCtrl.viewProfile)
router.get("/admin/teachers", userCtrl.viewTeachers)
router.get("/admin/students", userCtrl.viewStudents)

// update
router.patch("/profile/:id", userCtrl.updUser)
//delete
router.delete("/admin/teachers/:id", userCtrl.delUser)
router.delete("/admin/students/:id", userCtrl.delUser)


module.exports = router;
