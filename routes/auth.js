const express = require("express");
const Router = express.Router();
const { login, dashboard } = require("../controllers");
const passport = require("passport");

//auth request with google
Router.get("/google",
  passport.authenticate("google", { scope: ["profile","email"] })
);

//google auth callback
Router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

//logout user
Router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = Router;
