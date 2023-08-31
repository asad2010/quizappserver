const Categories = require("../model/categoryModel");
const {uploadedFile, deleteFile} = require("../services/cloudinary")
const Questions = require("../model/questionModel")

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

        if(!categoryName) return res.status(403).send({message: "Please fill all fields"})
        const isCategoryExists = await Categories.findOne({categoryName})
        if(isCategoryExists) return res.status(403).send({message: "Category already exists"})
        if (req.files) {
            const {categoryImg} = req.files
            if (categoryImg.mimetype == "image/png" || categoryImg.mimetype == "image/jpeg") {
                try {
                    const result = await uploadedFile(categoryImg)
                    if (!result) return res.status(402).send({ message: "Something went wrong" })
                    const category = await Categories.create({
                        categoryName,
                        categoryImg: result
                    })
                    res.status(200).send({ message: "Category created successfully", category })
                } catch (error) {
                    console.error(error)
                    res.status(500).send({ message: "Something went wrong" })
                }
            } else {
                res.status(403).send({message: "File must be on format png or jpeg"})
            }
        }
    },
    updCategory: async (req, res) => {
        const { id } = req.params;
        try {
            const category = await Categories.findById(id)
            if(!category)return res.status(404).send({message: "Category not found"})
            // update profile img
            if (req.files) {
                const {categoryImg} = req.files
                if (categoryImg.mimetype == "image/png" || categoryImg.mimetype == "image/jpeg") {
                    const result = await uploadedFile(categoryImg)
                    req.body.categoryImg = result;
                    if (user.categoryImg.public_id) {
                        await deleteFile(user.categoryImg.public_id)
                    }
                } else {
                    return res.status(400).json({ message: "File format is should png or jpeg!" })
                }
            }            
            const updatedCategory = await Categories.findByIdAndUpdate(id, req.body, { new: true })
            const { password, ...otherDetails } = updatedCategory._doc
            res.status(200).send({ message: "User successfully updated", category: otherDetails })
        } catch (error) {
            res.status(500).send({ message: "Something went wrong..." })
            console.error(error)
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