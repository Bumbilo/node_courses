const express = require("express");
const passport = require('../../middleware/passport');
const router = express.Router();
const User = require("../../models/User");

router.get("/login", async (req, res) => {
  try {
    res.render("user/login");
  } catch (error) {
    res.sendStatus(404);
  }
});

router.get("/me", async (req, res) => {
  try {
    const {userId} = req.cookies;
    const user = await User.findById(userId);
    res.render("user/profile", {
      title: "User",
      user,
    });
  } catch (error) {
    res.sendStatus(404);
  }
});

router.post("/login",passport.authenticate('local',{failureRedirect: '/api/user/login'}), async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    res.redirect('me')
  } catch (error) {
    res.sendStatus(404);
  }
});

router.post("/signup", (req, res) => {
  try {
    const { username, password, name, emails } = req.body;
    const user = new User({ username, password, name, emails });
    user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json();
  }
});

module.exports = router;
