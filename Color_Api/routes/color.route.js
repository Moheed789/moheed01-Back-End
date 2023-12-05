const express = require("express");

const { 
    getallColors, 
    getColor, 
    createColor, 
    deleteColor, 
    updateColor 
} = require("../controller/color.controller");

const router = express.Router();

router.get("/", getallColors);

router.get("/:id", getColor);

router.post("/", createColor);

router.delete("/:id", deleteColor);

router.put("/:id", updateColor);

module.exports = router;