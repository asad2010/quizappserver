const Users = require("../model/userModel");
const { uploadedFile, deleteFile, removeTemp } = require("../services/cloudinary")
const userCtrl = {
    viewProfile: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await Users.findById(id)
            const { password, ...otherData } = user._doc
            res.status(200).send(otherData)
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: "Something went wrong..." })
        }
    },
    viewOneUser: async (req,res) => {
        try {
            const {id} = req.params;
            const user = await Users.findById(id)
            res.status(200).send(user)
        } catch (error) {
            console.error(error)
            res.status(500).send({message: "Something went wrong..."})
        }
    },
    updateProfileImg: async (req,res) => {
        try {
            const {id} = req.params;
            const {profileImg} = req.files;
            const user = await Users.findById(id)
            if(!user) return res.status(404).send({message: "USER NOT FOUND"})
            const result = await uploadedFile(profileImg)
            if(user.profilePicture.public_id){
                // await cloudinary.uploader.destroy(user.profilePicture.public_id)
                await deleteFile(user.profilePicture.public_id)
            }
            const updatedProfileImg = await Users.findByIdAndUpdate(id, {
                profilePicture: result
            }, {new: true})
            res.send({ message: "Profile image updated successfully", profilePicture: result})
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: "Something went wrong..." })
        }
    },

    viewStudents: async (req, res) => {
        try {
            const students = await Users.find({ role: 100 }).select("-password");
            res.json(students)
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: "Something went wrong..." })
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
    // A D D

    addTeacher: async (req, res) => {
        try {
            const { firstName, lastName, email, password } = req.body;
            const isTeacherExists = await Users.findOne({ email })
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
            await Users.findByIdAndUpdate(id, req.body, {new: true})
            res.status(200).send({ message: "User successfully updated" })
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: "Something went wrong..." })
        }
    },
    delUser: async (req, res) => {
        const { id } = req.params;
        try {
            const user = await Users.findById(id)
            if(!user) return res.status(403).send({message: "User not found"})
            const profilePicture = await Users.findById(id).select("profilePicture").public_id
            if(profilePicture == "") return (await Users.findByIdAndDelete(id), res.status(200).send({message: "OK"}))
            else {
                await deleteFile(profilePicture)
                await Users.findByIdAndDelete(id)
                res.send({ message: "User deleted successfully" })
            }
        } catch (error) {
            console.error(error)
            res.send({ message: "Something went wrong..." })
        }
    },

}

module.exports = userCtrl
