const Users = require("../model/userModel");
const Exams = require("../model/examModel");
const Groups = require("../model/groupModel");
const Questions = require("../model/questionModel");
const Categories = require("../model/categoryModel");

const userCtrl = {
    // Student
    viewExams: async (req, res) => {
        const exams = await Exams.find();
        res.send(exams)
    },
    viewProfile: async (req,res) => {
        // console.log(req.headers)
        // console.log(req.headers.email)
        if(!req.headers.email) return res.status(403).send({message: "Nimadur xato ketti"})
        const info = await Users.findOne({email: req.headers.email})
        res.send(info)
    },  
    // Teacher 

    // Admin

    // V I E W
    viewStudents: async (req, res) => {
        const students = await Users.find({ role: 100 });
        res.json(students)
    },
    viewGroups: async (req, res) => {
        const groups = await Groups.find();
        res.json(groups)
    },
    viewCategories: async (req, res) => {
        const categories = await Categories.find()
        res.json(categories)
    },
    viewOneCategory: async (req,res) =>{
        const {categoryName} = req.params;
        const category = await Categories.findOne({categoryName})
        res.send(category)
    },
    viewTeachers: async (req, res) => {
        const teachers = await Users.find({ role: 101 })
        res.json(teachers)
    },

    // A D D
    addGroup: async (req, res) => {
        const { groupName, teacher, company } = req.body;
        try {
            const group = await Groups.findOne({ groupName })
            if (group) {
                return res.status(401).send({ message: "This group already exists!" })
            }
            await Groups.create({
                groupName,
                teacher,
                company
            }).then(() => {
                res.send({ message: "Group created successfully" })
            })
        } catch (error) {
            console.error(error)
            res.send({ message: "Something went wrong..." })
        }
    },
    addTeacher: async (req, res) => {
        try {
            const { firstName, lastName, email, password } = req.body;
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
    addCategory: async (req,res) => {
        const {categoryName, categoryImg} = req.body;
        try {
            const category = await Users.create({
                categoryName,
                categoryImg
            })
            res.send({ message: "Category created successfully" })
        } catch (error) {
            console.error(error)
            res.send({message: "Something went wrong"})
        }
    },
    // U P D A T E
    updStudent: async (req, res) => {
        try {
            const { firstName, lastName, group, password, profilePicture } = req.body;
            await Users.findByIdAndUpdate(req.body.id, {
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
    updGroup: async (req, res) => {
        try {
            const { groupName, company } = req.body;
            await Groups.findByIdAndUpdate(req.params.id, {
                groupName,
                company
            })
            res.send({ message: "Group updated successfully" })
        } catch (error) {
            console.error(error)
            res.send({ message: "Something went wrong..." })
        }
    },

    // D E L E T E
    delQuestion: async (req, res) => {
        const { id } = req.params;
        try {
            await Questions.findByIdAndDelete(id)
            res.send({ message: "Question deleted successfully" })
        } catch (error) {
            console.error(error)
            res.send({ message: "Something went wrong..." })
        }
    },
    delCategory: async (req, res) => {
        const { id } = req.params;
        try {
            await Categories.findByIdAndDelete(id)
            res.send({ message: "Category deleted successfully" })
        } catch (error) {
            console.error(error)
            res.send({ message: "Something went wrong..." })
        }
    },
    delGroup: async (req, res) => {
        const { id } = req.params;
        try {
            await Groups.findByIdAndDelete(id)
            res.send({ message: "Group deleted successfully" })
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
    delExam: async (req,res) => {
        const { id } = req.params;
        try {
            await Exams.findByIdAndDelete(id)
            res.send({ message: "Exam deleted successfully" })
        } catch (error) {
            console.error(error)
            res.send({ message: "Something went wrong..." })
        }
    }
}

module.exports = userCtrl