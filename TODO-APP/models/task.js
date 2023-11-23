const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskModels = new mongoose.Schema({
    task: {
        type: String, 
        required: true
    },
    task_id: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Tasks", taskModels);