const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const User = require("../models/user");

// SIGNUP
//The signup route registers a new user by taking the username and password from the request body and saving it to the MongoDB database.
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
//The login route verifies the user's credentials and generates a JWT token which is used to authenticate future requests.
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