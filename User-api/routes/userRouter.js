const express = require("express");
const {getUse} = require("../controllers/userController");
const {
    getUsers,
    getUser,
    createUser,
    deleteuser,
    updateuser
} = require("../controllers/userController")

const router = express.Router();

router.get("/", getUsers);

router.get("/:id", getUser);

router.post("/", createUser);

router.delete("/:id", deleteuser);

router.patch("/:id", updateuser);

module.exports = router;