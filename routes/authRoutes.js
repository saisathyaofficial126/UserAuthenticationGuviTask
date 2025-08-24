const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getUserInfo,
  getAllUsers,  
} = require("../controllers/authController");

const verifyToken = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/me", verifyToken, getUserInfo);
router.get("/users", verifyToken, getAllUsers);  

const User = require("../models/User");

// 👇 Public GET route to show all users (no token needed)
router.get("/public-users", async (req, res) => {
  try {
    const users = await User.find().select("-password"); // exclude password
    res.json(users); // send all users as JSON
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

module.exports = router;
