const mongoose = require("mongoose");

const colorSchema = new mongoose.Schema({
    id:{
        type: Number,
        required: true
    },
    color:{
        type: String,
        required: true,
        lowercase: true
    },
}, {timestamps: true});

const Color = mongoose.model("Color", colorSchema);

module.exports = Color;