const Categories = require("../model/categoryModel");
const {uploadedFile, deleteFile, removeTemp} = require("../services/cloudinary")

const categoryCtrl = {
    viewCategories: async (req, res) => {
        if (req.files) {
            if (req.files.profilePicture) {
                const profilePicture = req.files.profilePicture;
                if (profilePicture.mimetype != "image/png" || profilePicture.mimetype != "image/jpeg") {
                    removeTemp(profilePicture.tempFilePath);
                    return res.status(400).json({ message: "File format is should png" })
                }

                const img = await uploadedFile(profilePicture);
                req.body.profilePicture = img;
                if (Users.profilePicture.public_id) {
                    await deleteFile(Users.profilePicture.public_id)
                }
            }
        }
        const categories = await Categories.find()
        res.json(categories)
    },
    viewOneCategory: async (req, res) => {
        const { id } = req.params;
        const category = await Categories.findOne({ id })
        res.send(category)
    },
    addCategory: async (req, res) => {
        const { id } = req.params;
        const { categoryName } = req.body;
        try {
            const category = await Categories.create({
                categoryName,
                categoryImg
            })
            res.send({ message: "Category created successfully" })
        } catch (error) {
            console.error(error)
            res.send({ message: "Something went wrong" })
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
}

module.exports = categoryCtrl