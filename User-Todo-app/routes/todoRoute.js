const express = require("express");

const {
    createTodo,
    updatedTodo,
    deleteTodo,
    getAllTodos,
} = require("../controller/userController");

const authenticateToken = require("../middleware/auth");

const router = express.Router();

router.post("/create", authenticateToken, createTodo);

router.put("/:id", authenticateToken, updatedTodo);

router.delete("/:id", authenticateToken, deleteTodo);

router.get("/", getAllTodos);

module.exports = router;