const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const User = require("../models/user");

// SIGNUP
router.post("/signup", async (req, res) => {

  const { username, password } = req.body;

  try {

    const user = new User({
      username,
      password
    });

    await user.save();

    res.json({
      message: "User registered successfully"
    });

  } catch (err) {

    res.status(400).json({
      error: err.message
    });

  }

});

// LOGIN
router.post("/login", async (req, res) => {

  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user || user.password !== password) {

    return res.status(401).json({
      message: "Invalid username or password"
    });

  }

  const token = jwt.sign(

    {
      id: user._id,
      role: user.role
    },

    process.env.JWT_SECRET,

    { expiresIn: "1h" }

  );

  res.json({
    token
  });

});

module.exports = router;