const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: String,
    content: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
