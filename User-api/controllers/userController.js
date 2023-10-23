const User = require("../models/userModel");
const mongoose = require("mongoose");

const getUsers = async(req, res) => {
    const users = await User.find({}).sort({createdAt: -1})
    res.status(200).json(users);
}

const getUser = async(req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: "No such user"});
    }
    const user = await User.findById({_id: id});
    if(!user){
        res.status(404).json({error: "No such user"});
    }
    res.status(200).json(user)
}

const createUser = async(req, res) => {
    const {name, email, password} = req.body;
    let emptyFields = [];

    if(!name){
        emptyFields.push("name")
    }
    if(!email){
        emptyFields.push("email")
    }
    if(!password){
        emptyFields.push("password")
    }
    if(emptyFields.length > 0){
        res.status(404).json({error: "Please fill in all fields", emptyFields})
    }

    try {
        const user = await User.create({name, email, password});
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

const deleteuser = async(req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: "No such user"});
    }
    const user = await User.findOneAndDelete({_id: id})
    if(!user){
        res.status(404).json({error: "No such user"});
    }
    res.status(200).json(user);
}

const updateuser = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such user" });
    }
    const updateFields = { ...req.body };
    delete updateFields._id;
    try {
        const user = await User.findOneAndUpdate({ _id: id }, updateFields, { new: true });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    getUsers,
    getUser,
    createUser,
    deleteuser,
    updateuser
};