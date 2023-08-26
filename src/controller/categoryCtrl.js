const Categories = require("../model/categoryModel");
const Questions = require("../model/questionModel")

const { uploadedFile, deleteFile, removeTemp } = require("../services/cloudinary")
const categoryCtrl = {
    viewCategories: async (req, res) => {
        try {
            const categories = await Categories.find()
            res.status(200).send(categories)
        } catch(error){
            console.error(error)
            res.status(500).send({message: "Something went wrong"})
        }
    },
    viewOneCategory: async (req, res) => {
        try {
            const { id } = req.params;
            const category = await Categories.findById(id)
            if(!category) return res.status(404).send({message: "Category not found"})
            res.send(category)
        } catch(error){
            console.error(error)
            res.status(500).send({message: "Something went wrong"})
        }
    },
    addCategory: async (req, res) => {
        const { categoryName } = req.body;
        if (req.files.categoryImg) {
            if (req.files.categoryImg.mimetype == "image/png" || req.files.categoryImg.mimetype == "image/jpeg") {
                try {
                    if (!categoryName || !req.files.categoryImg) return res.status(403).send({ message: "Please fill all fields" })
                    const result = await uploadedFile(req.files.categoryImg)
                    if (!result) return res.status(402).send({ message: "Something went wrong" })
                    const category = await Categories.create({
                        categoryName,
                        categoryImg: result
                    })
                    res.send({ message: "Category created successfully", category })
                } catch (error) {
                    console.error(error)
                    res.send({ message: "Something went wrong" })
                }
            } else {
                res.status(403).send({message: "File must be on format png or jpeg"})
            }
        }
    },

    delCategory: async (req, res) => {
        const { id } = req.params;
        try {
            const category = await Categories.findById(id)
            if(!category) return res.status(404).send({message: "Category not found"})
            const imgId = category.categoryImg.public_id
            await deleteFile(imgId)
            await Questions.deleteMany({category: id})
            await Categories.findByIdAndDelete(id)
            res.status(200).send({ message: "Category deleted successfully" })
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: "Something went wrong..." })
        }
    },
}

module.exports = categoryCtrl