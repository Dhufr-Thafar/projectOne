const express = require("express");
const carRoute = require('./carRoute')

const router = express.Router();

router.use("/cars", carRoute);

module.exports = router;