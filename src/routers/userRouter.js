const express = require('express')
const router = express.Router()
const userCtrl = require("../controller/userCtrl")


router.get("/user/profiles/:id", userCtrl.viewProfile)
router.get("/admin/teachers", userCtrl.viewTeachers)
router.get("/admin/students", userCtrl.viewStudents)
// add
router.post("/admin/teachers", userCtrl.addTeacher)


// update
router.post("/admin/students/:id", userCtrl.updStudentAdmin)
//delete
router.delete("/admin/teachers/:id", userCtrl.delUser)
router.delete("/admin/students/:id", userCtrl.delUser)


module.exports = router;
