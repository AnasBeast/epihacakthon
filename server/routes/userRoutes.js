const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getUser,
  regUser,
  loginUser,
  addAnswer,
  getAnswers,
  updateProfile,
  getAllUsers,
  verifyPasssword,
  testApi,
  verifyOauth,
  listenApi,
} = require("../controllers/userControllers");
router.get("/dashboard", getAllUsers);
router.post("/signup", regUser);
router.put("/login", loginUser);
router.get("/profile", protect, getUser);
router.post("/submit", protect, addAnswer);
router.get("/answers/:id", protect, getAnswers);
router.put("/editProfile", protect, updateProfile);
router.put("/verifyPassword", protect,verifyPasssword);
router.get("/getAiQuizz",testApi);
router.post("/auth/google",verifyOauth)
router.get("/sound",listenApi);
module.exports = router;
