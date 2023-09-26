const Groups = require("../model/groupModel")

const groupCtrl = {
    viewGroups: async (req, res) => {
        try {
            
            const groups = await Groups.find();
            res.json(groups)
        }
        catch(error){
            console.error(error)
            res.send({message: "Something went wrong"})
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
    addGroup: async (req, res) => {
        const { groupName, teacher, company } = req.body;
        try {
            const group = await Groups.findOne({ groupName })
            if (group) return res.status(401).send({ message: "This group already exists!" })
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

    
}

module.exports = groupCtrl;