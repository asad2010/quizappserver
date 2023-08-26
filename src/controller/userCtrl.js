const Users = require("../model/userModel");
const { uploadedFile, deleteFile, removeTemp } = require("../services/cloudinary")
const bcrypt = require('bcrypt')
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
    viewOneUser: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await Users.findById(id)
            res.status(200).send(user)
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: "Something went wrong..." })
        }
    },

    viewStudents: async (req, res) => {
        try {
            const students = await Users.find({ role: 100 }).select("-password");
            res.status(200).json(students)
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: "Something went wrong..." })
        }
    },
    viewTeachers: async (req, res) => {
        try {
            const teachers = await Users.find({ role: 101 }).select("-password")
            res.status(200).json(teachers)
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: "Something went wrong..." })
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
            const hashedPassword = await bcrypt.hash(password, 12)
            const teacher = await Users.create({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                role: 101
            })
            const teacherWithoutPassword = await Users.findById(teacher._id).select("-password")
            res.status(201).send({ message: "Teacher created successfully", teacher: teacherWithoutPassword })
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: "Something went wrong..." })
        }
    },

    updUser: async (req, res) => {
        const { id } = req.params;
        const { profilePicture } = req.files;
        try {
            const user = await Users.findById(id)
            if (!user) return res.status(404).send({ message: "User not found" })
            const updatedUser = await Users.findByIdAndUpdate(id, req.body, { new: true })

            // update profile img
            if (profilePicture) {
                if (profilePicture.mimetype == "image/png" || profilePicture.mimetype == "image/jpeg") {
                    const result = await uploadedFile(profilePicture)
                    if (user.profilePicture.public_id) {
                        await deleteFile(user.profilePicture.public_id)
                    }
                    const updatedProfileImg = await Users.findByIdAndUpdate(id, {
                        profilePicture: result
                    }, { new: true })
                } else {
                    removeTemp(profilePicture.tempFilePath);
                    return res.status(400).json({ message: "File format is should png or jpeg!" })
                }
            }
            const { password, ...otherDetails } = updatedUser._doc
            res.status(200).send({ message: "User successfully updated", user: otherDetails })
        } catch (error) {
            res.status(500).send({ message: "Something went wrong..." })
            console.error(error)
        }
    },
    delUser: async (req, res) => {
        const { id } = req.params;
        try {
            const user = await Users.findById(id)
            if (!user) return res.status(403).send({ message: "User not found" })
            const profilePicture = user.profilePicture
            if (profilePicture == "" || !profilePicture) { 
                await Users.findByIdAndDelete(id);
            } else {
                await deleteFile(profilePicture.public_id)
                await Users.findByIdAndDelete(id)
            }
            res.status(200).send({message: "User deleted successfully!"})
        } catch (error) {
            res.status(500).send({ message: "Something went wrong..." })
            console.error(error)
        }
    },

}

module.exports = userCtrl
