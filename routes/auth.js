require("dotenv").config();
const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
const fetch = require("node-fetch");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const getPosition = (lat) => lat

router.get("/login", (req, res, next) => {
  res.render("auth/login", { message: req.flash("error") });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    failureFlash: true,
    passReqToCallback: true
  })
);

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  
  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const email = req.body.email;
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.body.address}&key=${process.env.GKEY}`)
      .then(response => {
        return response.json()
      })
      .then(myJson => {
        const lat = myJson.results[0].geometry.location.lat
        const lng = myJson.results[0].geometry.location.lng
        User
          .create({
            username,
            password: hashPass,
            email,
            location: {
              type: "Point",
              coords: {
                lat,
                lng
              }
            }
          })
          .then(() => {
            res.redirect("/");
          })
          .catch(err => {
            res.render("auth/signup", { message: "Something went wrong" });
          });
      })
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
