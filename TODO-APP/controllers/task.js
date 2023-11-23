const mongoose = require("mongoose");
const Task = require("../models/task");

const getTasks = async (req, res) => {
    const tasks = await Task.find({}).sort({createdAt: -1});
    res.status(200).json(tasks);
}

const getTask = async (req, res) => {
    const { id } = req.param;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ message: "No such Task" });
    }
    const tasks = await Task.findById({_id: id})
    if(!tasks){
        res.status(404).json({ message: "No such Task" });
    }
    res.status(200).json(tasks);
}

const createTask = async (req, res, next) => {
    try {
        const { task, task_id } = req.body;
        await Task.create({
            task,
            task_id
        });
        res.status(201).json({
            success: true,
            message: "Task added Successfully"
        })
    } catch (error) {
        next(error);
    }
};

const updateTask = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such Task'})
    }
  
    const task = await Task.findOneAndUpdate({_id: id}, {
      ...req.body
    })
  
    if (!task) {
      return res.status(400).json({error: 'No such Task'})
    }
  
    res.status(200).json(task)
  }

const deleteTask = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: "No such Mobile-Shop"});
    }
    const tasks = await Task.findOneAndDelete({_id: id})
    if(!tasks){
        res.status(404).json({error: "No such Mobile-Shop"});
    }
    res.status(200).json(tasks);
}

module.exports = {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
}