const Categories = require("../model/categoryModel");
const Questions = require("../model/questionModel")

const {uploadedFile, deleteFile, removeTemp} = require("../services/cloudinary")
const categoryCtrl = {
    viewCategories: async (req, res) => {
        const categories = await Categories.find()
        res.json(categories)
    },
    viewOneCategory: async (req, res) => {
        const { id } = req.params;
        const category = await Categories.findById(id)
        res.send(category)
    },
    addCategory: async (req, res) => {
        const { id } = req.params;
        const { categoryName } = req.body;
        const {categoryImg} = req.files;
        if(!categoryName || !categoryImg) return res.status(403).send({message: "Please fill all fields"})
        try {
            const result = await uploadedFile(categoryImg)
            if(!result) return res.status(402).send({message: "Something went wrong"})
            const category = await Categories.create({
                categoryName,
                categoryImg: result
            })
            res.send({ message: "Category created successfully", category })
        } catch (error) {
            console.error(error)
            res.send({ message: "Something went wrong" })
        }
    },
    
    delCategory: async (req, res) => {
        const { id } = req.params;
        try {
            const category = await Categories.findById(id)
            const imgId = category.categoryImg.public_id
            await 
            await deleteFile(imgId).then(async ()=>{
                await Categories.findByIdAndDelete(id)
                res.status(200).send({ message: "Category deleted successfully" })
            })
        } catch (error) {
            console.error(error)
            res.send({ message: "Something went wrong..." })
        }
    },
}

module.exports = categoryCtrl