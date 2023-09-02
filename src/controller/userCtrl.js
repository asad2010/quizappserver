const Users = require("../model/userModel");
const { uploadFile, deleteFile } = require("../services/cloudinary")
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
    updUser: async (req, res) => {
        const { id } = req.params;
        try {
            const user = await Users.findById(id)
            if (!user) return res.status(404).send({ message: "User not found" })
            
            const {email} = req.body;
            const isExists = await Users.findOne({email})
            if(isExists) return res.status(402).send({message: "User already exists"})
            // update profile img
            if (req.files) {
                const {profilePicture} = req.files
                if (profilePicture.mimetype == "image/png" || profilePicture.mimetype == "image/jpeg") {
                    const result = await uploadFile(profilePicture)
                    req.body.profilePicture = result;
                    if (user.profilePicture.public_id) {
                        await deleteFile(user.profilePicture.public_id)
                    }
                } else {
                    return res.status(400).json({ message: "File format is should png or jpeg!" })
                }
            }            
            const updatedUser = await Users.findByIdAndUpdate(id, req.body, { new: true })

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
            
            if (user.profilePicture.public_id) { 
                await deleteFile(user.profilePicture.public_id)
            }

            await Users.findByIdAndDelete(id)
            res.status(200).send({message: "User deleted successfully!"})
        } catch (error) {
            res.status(500).send({ message: "Something went wrong..." })
            console.error(error)
        }
    },

}

module.exports = userCtrl
