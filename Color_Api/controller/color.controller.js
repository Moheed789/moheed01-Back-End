const Color = require("../models/color.model");
const mongoose = require("mongoose");

const getallColors = async(req, res) => {
    const colors = await Color.find({}).sort({createdAt: -1})
    res.status(200).json(colors);
}

const getColor = async(req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: "No such Color"});
    }
    const colors = await Color.findById({_id: id});
    if(!colors){
        res.status(404).json({error: "No such Color"});
    }
    res.status(200).json(colors)
}

const createColor = async(req, res) => {
    const {id, color} = req.body;
    let emptyFields = [];

    if(!id){
        emptyFields.push("id")
    }
    if(!color){
        emptyFields.push("color")
    }
    if(emptyFields.length > 0){
        res.status(404).json({error: "Please fill in all fields", emptyFields})
    }

    try {
        const colors = await Color.create({id, color});
        res.status(200).json(colors);
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

const deleteColor = async(req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: "No such Color"});
    }
    const colors = await Color.findOneAndDelete({_id: id})
    if(!colors){
        res.status(404).json({error: "No such Color"});
    }
    res.status(200).json(colors);
}

const updateColor = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such Color" });
    }
    const updateFields = { ...req.body };
    delete updateFields._id;
    try {
        const colors = await Color.findOneAndUpdate({ _id: id }, updateFields, { new: true });
        if (!colors) {
            return res.status(404).json({ error: "Color not found" });
        }
        return res.status(200).json(colors);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    getallColors,
    getColor,
    createColor,
    deleteColor,
    updateColor
};