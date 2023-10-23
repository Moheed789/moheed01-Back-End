const mongoose = require("mongoose");
const Students = require("../models/studentmodel");

const getStudents = async (req, res) => {
    const students = await Students.find({}).sort({createdAt: -1});
    res.status(200).json(students);
}

const getStudent = async (req, res) => {
    const { id } = req.param;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ message: "No such Student" });
    }
    const students = await Students.findById({_id: id})
    if(!students){
        res.status(404).json({ message: "No such Student" });
    }
    res.status(200).json(students);
}

const createStudent = async (req, res) => {
    const { Student_name, Student_rollno, isPresented } = req.body;

    let emptyField = [];
    if (!Student_name) {
        emptyField.push("Student_name")
    }
    if (!Student_rollno) {
        emptyField.push("Student_rollno")
    }
    if (!isPresented) {
        emptyField.push("isPresented")
    }
    if(emptyField.length > 0){
        res.status(404).json({error: "Please fill in all fields", emptyField})
    }

    try {
        const students = await Students.create({ Student_name, Student_rollno, isPresented});
        res.status(200).json(students);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

const updateStudent = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ error: "NO such Student" });
    }
    const updateFields = {...req.body};
    try {
        const students = await Students.findOneAndUpdate({_id: id}, updateFields, {new: true})
        if (!students) {
            res.status(404).json({ error: error.message });
        }
        res.status(200).json(students);
    } catch (error) {
        return res.status(500).json({error: "Internal server error"})
    }
}

const deleteStudent = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: "No such Mobile-Shop"});
    }
    const students = await Students.findOneAndDelete({_id: id})
    if(!students){
        res.status(404).json({error: "No such Mobile-Shop"});
    }
    res.status(200).json(students);
}

module.exports = {
    getStudents,
    getStudent,
    createStudent,
    updateStudent,
    deleteStudent
}