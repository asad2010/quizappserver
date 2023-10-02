const Groups = require("../model/groupModel")

const groupCtrl = {
    viewGroups: async (req, res) => {
        try {
            const groups = await Groups.find();
            res.status(200).send(groups)
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Something went wrong" })
        }

    },

    viewOneGroups: async (req, res) => {
        const { id } = req.params;
        try {
            const groupOne = await Groups.findById(id);
            if (!groupOne) return res.status(404).send("Group not found")
            res.status(200).send(groupOne)
        } catch (error) {
            res.status(500).send({ message: "Something went wrong" })
            console.log(error);
        }
    },

    addGroup: async (req, res) => {
        const { groupName } = req.body;
        try {
            const group = await Groups.findOne({ groupName })
            if (group) return res.status(401).send({ message: "This group already exists!" })
            await Groups.create(req.body)
            res.status(200).send({ message: "Group created successfully" })
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: "Something went wrong..." })
        }
    },

    updGroup: async (req, res) => {
        const { id } = req.params;
        try {
            const { groupName } = req.body;
            const group = await Groups.findOne({ groupName })
            if (group) return res.status(400).send({ message: "Group already exists" })
            const updatedGroup = await Groups.findByIdAndUpdate(id, req.body, {new: true})
            res.status(200).send({ message: "Group updated successfully", group: updatedGroup})
        } catch (error) {
            res.status(500).send({ message: "Something went wrong..." })
            console.error(error)
        }
    },

    delGroup: async (req, res) => {
        const { id } = req.params;
        try {
            const group = await Groups.findByIdAndDelete(id)
            if (!group) return res.status(404).send({ message: "Group not found" })
            res.status(201).send({ message: "Group delete successfully" })
        } catch (error) {
            res.status(500).send({ message: "Something went wrong..." })
            console.error(error)
        }
    },




}

module.exports = groupCtrl;