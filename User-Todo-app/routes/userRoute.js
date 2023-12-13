const express = require("express");

const {
    signIn,
    signUp,
    getAllTodos,
    forgotPassword,
} = require("../controller/userController");

const router = express.Router();

router.post("/signin", signIn);

router.post("/signup", signUp);

router.get("/", getAllTodos);

router.post("/forgotpassword", forgotPassword);

module.exports = router;