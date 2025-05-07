const express = require("express"); 
const jwt = require("jsonwebtoken"); 
const User = require("../models/user"); 
const router = express.Router(); 
// Sign-up route 
router.post("/signup", async (req, res) => { 
const { username, password } = req.body;
try { 
    // Check if user already exists 
    const existingUser = await User.findOne({ username }); 
    if (existingUser) { 
      return res.status(400).json({ message: "User already exists" }); 
    } 
 
    // Create new user 
    const newUser = new User({ username, password }); 
    await newUser.save(); 
 
    res.status(201).json({ message: "User created successfully" }); 
  } catch (error) { 
    res.status(500).json({ message: "Error creating user" }); 
  } 
}); 
 
// Login route 
router.post("/login", async (req, res) => { 
  const { username, password } = req.body; 
 
  try { 
    const user = await User.findOne({ username }); 
    if (!user) { 
      return res.status(400).json({ message: "Invalid credentials" }); 
    } 
 
    const isMatch = await user.comparePassword(password); 
    if (!isMatch) { 
      return res.status(400).json({ message: "Invalid credentials" }); 
    } 
 
    // Create JWT token 
    const token = jwt.sign({ userId: user._id }, "secretKey", { 
      expiresIn: "1h", 
    }); 
 
    // Set cookie 
    res.cookie("authToken", token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production", // Only for https 
    }); 
 
    res.json({ message: "Login successful" }); 
  } catch (error) { 
    res.status(500).json({ message: "Error logging in" }); 
  } 
}); 
 
module.exports = router; 