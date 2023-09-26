const Groups = require("../model/groupModel")

const groupCtrl = {
    viewGroups: async (req, res) => {
        try {
            const groups = await Groups.find();
            res.json(groups)
        } catch (error) {
            console.log(error);
            res.send({message: "Something went wrong"})
        }
        
    },
        
    viewOneGroups: async (req, res) => {
        const { id } = req.params;
        try {
         const groupsOne = await Groups.findById(id);
           if(!groupsOne) return res.status("Groups not found") 
        } catch (error) {
            console.log(error);
            res.send({message: "Something went wrong error"})
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
        const { id } = req.params;
        try {
            const { groupName, company } = req.body;
            await Groups.findByIdAndUpdate(req.params.id, id, {
                groupName,
                company
            })
            res.send({ message: "Group updated successfully" })
        } catch (error) {
            console.error(error)
            res.send({ message: "Something went wrong..." })
        }
    },

    delGroup: async (req, res) => {
        const { id } = req.params;
        try {
            const group = await Groups.findByIdAndDelete(id)
            if(!group) return res.status(404).send({message: "Group not found"})
            res.status(201).send({message: "Group delete successfully"})
        } catch (error) {
            console.error(error)
            res.send({ message: "Something went wrong..." })
        }
    },
   
    

    
}

module.exports = groupCtrl;