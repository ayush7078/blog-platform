const express = require("express");
const auth = require("../middleware/auth");
const Post = require("../models/Post");
const router = express.Router();

// Create a post
router.post("/", auth, async (req, res) => {
  const { title, content, tags } = req.body;
  try {
    const post = new Post({ title, content, tags, author: req.user.id });
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get all posts (public)
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "username")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Search and filter posts by title or tags
router.get("/search", async (req, res) => {
  const { query } = req.query;
  try {
    const posts = await Post.find({
      $or: [{ title: new RegExp(query, "i") }, { tags: new RegExp(query, "i") }],
    }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


// Update a post (owner only)
router.put("/:id", auth, async (req, res) => {
  const { title, content, tags } = req.body;
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.author.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    post.title = title;
    post.content = content;
    post.tags = tags;
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a post (owner only)
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.author.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    await post.remove();
    res.json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
