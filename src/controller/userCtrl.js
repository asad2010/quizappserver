const Users = require("../model/userModel");
const Groups = require("../model/groupModel");
const Questions = require("../model/questionModel");
const { uploadedFile, deleteFile, removeTemp } = require("../services/cloudinary")
const userCtrl = {

    viewProfile: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await Users.findById(id)
            const { password, ...otherData } = user
            res.send(otherData._doc)
        } catch (error) {
            console.error(error)
            res.send({ message: "Something went wrong..." })
        }
    },

    viewStudents: async (req, res) => {
        try {
            const students = await Users.find({ role: 100 });
            res.json(students)
        } catch (error) {
            console.error(error)
            res.status(403).send({ message: "Something went wrong..." })
        }
    },
    searchStudentsByFirstName: async (req, res) => {
        try {
            const nameRegex = new RegExp(req.body.firstName, 'i')
            const users = await Users.find()
            const foundUsers = users.filter(user => nameRegex.test(user.firstName))

            res.send(foundUsers)
        } catch (error) {
            console.error(error)
            res.status(403).send({ message: "Something went wrong" })
        }
    },

    viewTeachers: async (req, res) => {
        try {
            const teachers = await Users.find({ role: 101 })
            res.json(teachers)
        } catch (error) {
            console.error(error)
            res.send({ message: "Something went wrong..." })
        }
    },
    viewOneTeacher: async (req, res) => {
        const { id } = req.params;
        try {
            const teacher = await Users.findById(id)
            res.send(teacher)
        } catch (error) {
            console.error(error)
            res.send({ message: "Something went wrong..." })
        }
    },
    // A D D

    addTeacher: async (req, res) => {
        try {
            const { firstName, lastName, email, password } = req.body;

            const isTeacherExists = await Users.find({ email })
            if (isTeacherExists) {
                return res.status(403).send({ message: "Teacher already exists" })
            }
            const teacher = await Users.create({
                firstName,
                lastName,
                email,
                password,
                role: 101
            })
            res.send({ message: "Teacher created successfully" })
        } catch (error) {
            console.error(error)
            res.send({ message: "Something went wrong..." })
        }
    },

    updStudent: async (req, res) => {
        const { id } = req.params;
        try {
            const { firstName, lastName, group, profilePicture } = req.body;
            await Users.findByIdAndUpdate(id, {
                firstName,
                lastName,
                group,
                profilePicture
            })
            res.send({ message: "User successfully updated" })
        } catch (error) {
            console.error(error)
            res.send({ message: "Something went wrong..." })
        }
    },
    updStudentAdmin: async (req, res) => {
        try {
            const { id } = req.params;
            const { firstName, lastName, group, password, profilePicture } = req.body;
            await Users.findByIdAndUpdate(id, {
                firstName,
                lastName,
                group,
                password,
                profilePicture
            })
            res.send({ message: "User successfully updated" })
        } catch (error) {
            console.error(error)
            res.send({ message: "Something went wrong..." })
        }
    },


    delUser: async (req, res) => {
        const { id } = req.params;
        try {
            await Users.findByIdAndDelete(id)
            res.send({ message: "User deleted successfully" })
        } catch (error) {
            console.error(error)
            res.send({ message: "Something went wrong..." })
        }
    },

}

module.exports = userCtrl
