'use strict'
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

//Load SignUpSignIn Model
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

//Load User Model
const User = require('../../models/User');

router.get('/signUp', (req, res) => res.json({ msg: "Sign Up For Grocery App working fine" }));

router.post("/signUpUser", async function (req, res) {
  const { errors, isValid } = validateRegisterInput(req.body);
  console.log(isValid);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  console.log("In signup User route");
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        errors.email = 'Email already exists';
        return res.status(400).json(errors);
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
});

router.post("/signIn", async function (req, res) {
  console.log("in signin route..");
  const { errors, isValid } = validateLoginInput(req.body);
  console.log(isValid);
  if (!isValid) {
    return res.status(400).json(errors);
  }


  console.log(req.body);
  let { email, password } = req.body;
  email = email.toLowerCase().trim();
  // Find user by email

  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      errors.email = 'User not found';
      return res.status(404).json(errors);
    }
    //console.log(password, user.password);
    // Check Password
    bcrypt
      .compare(password, user.password)
      .then(isMatch => {
        if (isMatch) {
          // User Matched
          const payload = { id: user.id, name: user.name }; // Create JWT Payload

          // Sign Token
          jwt.sign(
            payload,
            keys.secret,
            { expiresIn: 3600 },
            (err, token) => {
              res.json({
                success: true,
                token: 'Bearer ' + token
              });
              console.log("Token is:", token);
            }
          );
        } else {
          errors.password = 'Password incorrect';
          return res.status(400).json(errors);
        }
      });
  });
});

router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    });
  }
);

module.exports = router;