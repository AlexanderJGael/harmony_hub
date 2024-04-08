const express = require("express");
const router = express.Router();
const { Forum } = require("../models");

router.post("/forum", async (req, res) => {
  try {
    const newPost = await Forum.create(req.body);
    res.status(201).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/forum/:id", async (req, res) => {
  try {
    const post = await Forum.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/forum/:id", async (req, res) => {
  try {
    const [updated] = await Forum.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      res.status(200).json({ message: "Post updated successfully" });
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/forum/:id", async (req, res) => {
  try {
    const deleted = await Forum.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
