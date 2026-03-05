const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
{
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true
  },

  author: {
    type: String,
    required: [true, "Author is required"],
    trim: true
  },

  genre: {
    type: String,
    required: [true, "Genre is required"],
    trim: true
  },

  rating: {
    type: Number,
    min: [1, "Rating must be at least 1"],
    max: [5, "Rating cannot exceed 5"]
  }
},
{ timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);