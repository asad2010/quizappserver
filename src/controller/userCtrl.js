const Users = require("../model/userModel");
const Exams = require("../model/examModel");
const Groups = require("../model/groupModel");
const Questions = require("../model/questionModel");
const Categories = require("../model/categoryModel");

const userCtrl = {
    // Student
    viewExams: async (req,res) => {
        const exams = await Exams.find();
        res.json(exams)
    },
    // Teacher 
    
    // Admin

    // V I E W
    viewStudents: async (req,res) => {
        const students = await Users.find({role: 100});
        res.json(students)
    },
    viewGroups: async (req,res) => {
        const groups = await Groups.find();
        res.json(groups)
    },
    viewCategories: async (req,res) =>{
        const categories = await Categories.find()
        res.json(categories)
    },
    viewTeachers: async (req,res) => {
        const teachers = await Users.find({role: 101})
        res.json(teachers)
    },

    // A D D
    addGroup: async (req,res) => {
        const {groupName, teacher, company} = req.body;
        try {
            const group = await Groups.findOne({groupName})
            if(group){
                return res.status(401).send({message: "This group already exists!"})
            }
            await Groups.create({
                groupName,
                teacher,
                company
            }).then(()=>{
                res.send({message: "Group created successfully"})
            })
        } catch (error) {
            console.error(error)
            res.send({message: "Something went wrong..."})
        }
    },
    addTeacher: async(req,res)=>{
        try {
            const {firstName, lastName, email, password} = req.body;
            const teacher = await Users.create({
                firstName,
                lastName,
                email,
                password,
                role: 101
            })
            res.send({message: "Teacher created successfully"})
        } catch (error) {
            console.error(error)
            res.send({message: "Something went wrong..."})
        }
    },
    // U P D A T E
    updTeacher: async (req,res) => {
        try {
            
        } catch (error) {
            
        }
    }

}

module.exports = userCtrl