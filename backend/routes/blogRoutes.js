const express = require("express");
const Blog = require("../models/blogModel");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

// GET all
router.get("/", async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
});

// GET by slug
router.get("/:slug", async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug });

  if (!blog) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json(blog);
});

// CREATE
router.post("/", verifyToken, async (req, res) => {
  const blog = await Blog.create(req.body);
  res.json(blog);
});

module.exports = router;
