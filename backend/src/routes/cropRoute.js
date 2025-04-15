const express = require("express");
const router = express.Router();
const { createCrop, getNearbyCrops } = require("../controllers/cropcontroler");

router.post("/createcrop", createCrop);
router.get("/nearby", getNearbyCrops);

module.exports = router;
