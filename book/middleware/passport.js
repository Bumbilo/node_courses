const User = require("../models/User");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

async function verify(username, password, done) {
  try {
    const user = await User.findOne({ username, password });
    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (error) {
    return done(err);
  }
}

const options = {
  usernameField: "username",
  passwordField: "password",
  passReqToCallback: false,
};

passport.use("local", new LocalStrategy(options, verify));

passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(async function (id, cb) {
  try {
    const user= await User.findById(id);
    cb(null, user);
  } catch (error) {
    return cb(err);
  }
});

module.exports = passport;