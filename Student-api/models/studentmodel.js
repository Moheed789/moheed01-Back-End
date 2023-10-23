const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const studentModels = new mongoose.Schema({
    Student_name: {
        type: String, 
        required: true
    },
    Student_rollno: {
        type: Number, 
        required: true
    },
    isPresented: {
        type: Boolean, 
        required: true
    }
});

module.exports = mongoose.model("Students", studentModels);