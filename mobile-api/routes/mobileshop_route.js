const express = require("express");
const {getMobileshop} = require("../controllers/mobileshop_controller");
const { 
    getMobileShops,
    getMobileShop,
    createMobileShop,
    deleteMobileShop,
    updateMobileShop
} = require("../controllers/mobileshop_controller");

const router = express.Router();

router.get("/", getMobileShops);

router.get("/:id",  getMobileShop);

router.post("/", createMobileShop);

router.delete("/:id", deleteMobileShop);

router.patch("/:id", updateMobileShop);

module.exports = router;