const express = require("express");
const router = express.Router();

const Book = require("../models/Book");
const protect = require("../middleware/authmiddleware");
const adminOnly = require("../middleware/adminMiddleware");

// ADD BOOK (ADMIN ONLY)
//This route allows only admin users to add a new book to the database.

router.post("/", protect, adminOnly, async (req, res) => {
  try {

    const { title, author, genre, rating } = req.body;

    if (!title || !author || !genre) {
      return res.status(400).json({
        message: "Title, Author and Genre are required"
      });
    }

    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({
        message: "Rating must be between 1 and 5"
      });
    }

    const book = new Book({
      title,
      author,
      genre,
      rating
    });

    await book.save();

    res.status(201).json({
      message: "Book added successfully",
      book
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error",
      error: error.message
    });

  }
});

// GET ALL BOOKS (Pagination + Filters)
// This route returns books from the database and supports pagination and filtering based on genre and rating.

router.get("/", async (req, res) => {

  try {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const genre = req.query.genre;
    const rating = req.query.rating;

    const query = {};

    if (genre) {
      query.genre = genre;
    }

    if (rating) {
      query.rating = { $gte: Number(rating) };
    }

    const skip = (page - 1) * limit;

    const books = await Book.find(query)
      .skip(skip)
      .limit(limit);

    const total = await Book.countDocuments(query);

    res.status(200).json({
      books,
      page,
      totalPages: Math.ceil(total / limit)
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error",
      error: error.message
    });

  }

});

// GET SINGLE BOOK BY ID
//This route fetches a specific book using its MongoDB ID.

router.get("/:id", async (req, res) => {

  try {

    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found"
      });
    }

    res.status(200).json(book);

  } catch (error) {

    res.status(500).json({
      message: "Server error",
      error: error.message
    });

  }

});

module.exports = router;