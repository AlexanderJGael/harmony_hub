const router = require("express").Router();
const userRoutes = require("../../routes/userRoutes");
const blogRoutes = require("../../routes/blogRoutes");
const forumRoutes = require("../../routes/forumRoutes")

router.use("/user", userRoutes);
router.use("/blog", blogRoutes);
router.use("/forum", forumRoutes);

module.exports = router;
