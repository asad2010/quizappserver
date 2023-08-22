const express = require('express')
const router = express.Router()
const userCtrl = require("../controller/userCtrl")


router.get("/student/exams", userCtrl.viewExams)
router.get("/user/profiles/:id", userCtrl.viewProfile)
router.get("/admin/categories", userCtrl.viewCategories)
router.get("/admin/categories/:id", userCtrl.viewOneCategory)
router.get("/admin/teachers", userCtrl.viewTeachers)
router.get("/admin/students", userCtrl.viewStudents)
router.get("/admin/groups", userCtrl.viewGroups)
// add
router.post("/admin/teachers", userCtrl.addTeacher)
router.post("/admin/categories", userCtrl.addCategory)
router.post("/admin/question", userCtrl.addQuestion)
// update
router.post("/admin/students/:id", userCtrl.updStudentAdmin)
//delete
router.delete("/admin/teachers/:id", userCtrl.delUser)
router.delete("/admin/categories/:id", userCtrl.delCategory)
router.delete("/admin/students/:id", userCtrl.delUser)


module.exports = router;
