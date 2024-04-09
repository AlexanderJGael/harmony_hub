const express = require("express");
const router = express.Router();

const userApi = require("./userApi");

router.use("/users", userApi);

module.exports = router;
