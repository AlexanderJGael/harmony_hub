const express = require("express");
const router = express.Router();
const { Forum } = require("../models");

router.get("/", async (req, res) => {
  try {
    logged_in = req.session.logged_in;
    const forumPosts = await Forum.findAll();
    forumPosts.forEach((post) => {
      post.dataValues.createdAt = post.dataValues.createdAt.toDateString();
    });

    res.render("forum", { forumPosts, logged_in });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});



router.get("/:id", async (req, res) => {
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

router.post("/router", async (req, res) => {
  try {
    const newPost = await Forum.create(req.body);
    res.status(201).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


router.put("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
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
