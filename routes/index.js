const express = require("express");
const router = express.Router();

const homeRoutes = require("./homeRoutes");
const loginRoutes = require("./loginRoutes");
const userRoutes = require("./userRoutes");
const profileRoutes = require("./profileRoutes");

router.use("/", homeRoutes);
router.use("/login", loginRoutes);
router.use("/user", userRoutes);
router.use('/register', userRoutes);
router.use('/profile', profileRoutes);

module.exports = router;