const MobileShop = require("../models/mobileshop_model");
const mongoose = require("mongoose");

const getMobileShops = async(req, res) => {
    const mobileshop = await MobileShop.find({}).sort({createdAt: -1})
    res.status(200).json(mobileshop);
}

const getMobileShop = async(req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: "No such Mobile-Shop"});
    }
    const mobileshop = await MobileShop.findById({_id: id});
    if(!mobileshop){
        res.status(404).json({error: "No such Mobile-Shop"});
    }
    res.status(200).json(mobileshop)
}

const createMobileShop = async(req, res) => {
    const {mobile_model, mobile_price, mobile_available} = req.body;
    let emptyFields = [];

    if(!mobile_model){
        emptyFields.push("mobile_model")
    }
    if(!mobile_price){
        emptyFields.push("mobile_price")
    }
    if(!mobile_available){
        emptyFields.push("mobile_available")
    }
    if(emptyFields.length > 0){
        res.status(404).json({error: "Please fill in all fields", emptyFields})
    }

    try {
        const mobileshop = await MobileShop.create({mobile_model, mobile_price, mobile_available});
        res.status(200).json(mobileshop);
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

const deleteMobileShop = async(req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: "No such Mobile-Shop"});
    }
    const mobileshop = await MobileShop.findOneAndDelete({_id: id})
    if(!mobileshop){
        res.status(404).json({error: "No such Mobile-Shop"});
    }
    res.status(200).json(mobileshop);
}

const updateMobileShop = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such Mobile-Shop" });
    }
    const updateFields = { ...req.body };
    delete updateFields._id;
    try {
        const mobileshop = await MobileShop.findOneAndUpdate({ _id: id }, updateFields, { new: true });
        if (!mobileshop) {
            return res.status(404).json({ error: "Mobile-Shop not found" });
        }
        return res.status(200).json(mobileshop);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    getMobileShops,
    getMobileShop,
    createMobileShop,
    deleteMobileShop,
    updateMobileShop,
};