const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mobileShopSchema = new mongoose.Schema({
    mobile_model: {
        type: String,
        required: true,
    },
    mobile_price: {
        type: Number,
        required: true,
    },
    mobile_available: {
        type: Boolean,
        required: true,
    }
}, { timestamps: true })

module.exports = mongoose.model("Mobile-Shop", mobileShopSchema);