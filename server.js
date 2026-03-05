require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/bookdb")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Book Model
const Book = require("./Book");

// ADD BOOK
app.post("/books", async (req, res) => {
  try {
    const { title, author, genre, rating } = req.body;

    if (!title || !author || !genre) {
      return res.status(400).json({
        message: "Title, author and genre are required"
      });
    }

    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({
        message: "Rating must be between 1 and 5"
      });
    }

    const book = new Book({ title, author, genre, rating });
    await book.save();

    res.status(201).json({
      message: "Book added successfully",
      book
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET ALL BOOKS (Pagination + Filter)
app.get("/books", async (req, res) => {
  try {
    const { page = 1, limit = 10, genre, rating } = req.query;

    let filter = {};

    if (genre) {
      filter.genre = { $regex: genre, $options: "i" };
    }

    if (rating) {
      filter.rating = { $gte: Number(rating) };
    }

    const books = await Book.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Book.countDocuments(filter);

    res.status(200).json({
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      books
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET SINGLE BOOK
app.get("/books/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);

  } catch (err) {
    res.status(500).json({ message: "Invalid ID" });
  }
});
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
app.use("/api/auth", require("./routes"));
