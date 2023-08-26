const express = require('express')
const router = express.Router()
const userCtrl = require("../controller/userCtrl")


router.get("/profile/:id", userCtrl.viewProfile)
router.get("/admin/teachers", userCtrl.viewTeachers)
router.get("/admin/students", userCtrl.viewStudents)
// add
router.post("/admin/teachers", userCtrl.addTeacher)


// update
router.post("/profile/:id", userCtrl.updUser)
//delete
router.delete("/admin/teachers/:id", userCtrl.delUser)
router.delete("/admin/students/:id", userCtrl.delUser)


module.exports = router;
