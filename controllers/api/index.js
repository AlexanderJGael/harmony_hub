const express = require("express");
const router = express.Router();

const userApi = require("./userApi");

router.use("/api", userApi);

module.exports = router;
