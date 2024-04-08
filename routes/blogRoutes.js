const express = require("express");
const router = express.Router();
const { Blog } = require("../models/Blog");
const withAuth = require("../utils/auth");

router.post("/blog", withAuth, async (req, res) => {
    try {
      const newBlog = await Blog.create({
        ...req.body,
        user_id: req.session.user_id,
      });
      res.status(200).json(newBlog);
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  });
  
router.put("/blog/:id", withAuth, async (req, res) => {
  try {
    const blogData = await Blog.update(req.body, {
      where: { id: req.params.id },
    });
    if (!blogData) {
      res.status(404).json({ message: "No blog post found with this id!" });
      return;
    }
    res.status(200).json(blogData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.delete("/blog/:id", withAuth, async (req, res) => {
  try {
    const blogData = await BlogPost.destroy({
      where: { id: req.params.id },
    });
    if (!blogData) {
      res.status(404).json({ message: "No blog post found with this id!" });
      return;
    }
    res.status(200).json(blogData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
  