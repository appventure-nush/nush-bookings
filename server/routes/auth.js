const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();

const User = require('../models/user');
const checkAuth = require('../middleware/check-auth');

router.get('/', checkAuth, (req, res) => {
  const userObj = Object.assign({}, req.user._doc);
  delete userObj.password;
  res.send(userObj);
});

router.post('/sign-in', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({
    username,
  }).exec();
  if (user && bcrypt.compareSync(password, user.password)) {
    jwt.sign({ id: user._id }, process.env.JWT_KEY, (err, token) => {
      res.status(200).send({ token, user });
    });
  } else {
    res.sendStatus(403);
  }
});

router.post('/sign-up', async (req, res) => {
  try {
    const existingUser = await User.exists({ username: req.body.username });

    if (existingUser) {
      // if a user with this email already exists, send an error
      res.status(400).send({
        message:
          'A user with this username or email already exists. Would you like to sign in instead?',
      });
    } else {
      const user = await User.create({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 14),
        profilePic: req.body.profilePic,
        bio: req.body.bio,
        phoneNumber: req.body.phoneNumber,
        wastesPosted: [],
        favorites: [],
        darkMode: false,
        dateJoined: Date.now(),
      });
      jwt.sign({ id: user._id }, process.env.JWT_KEY, (err, token) => {
        res.send({
          token,
          user,
        });
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;
