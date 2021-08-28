const express = require('express');
const router = express.Router();
const User = require('../models/user');
const checkAuth = require('../middleware/check-auth');

/* GET users by their ids. */
router.get('/:id', async function (req, res) {
  const user = await User.findById(req.params.id);
  const userObj = Object.assign({}, user._doc);
  delete userObj.password;
  res.send(userObj);
});

// Change User Infos
router.put('/', checkAuth, async (req, res) => {
  req.user.username = req.body.username;
  req.user.profilePic = req.body.profilePic;
  req.user.bio = req.body.bio;
  req.user.phoneNumber = req.body.phoneNumber;
  await req.user.save();
  res.sendStatus(200);
});

// Delete your account
// router.delete('/:id', async (req, res) => {
//   try {
//     const existingAccount = await Waste.findById(req.params.id);

//     if (req.user.id == exisitingAccount.id) {
//       const wastesPostedByUser = Waste.filter((user.id = req.user.id));
//       for (a of wastesPostedByUser) {
//         await a.delete();
//       }
//       await existingAccount.delete();
//       res.sendStatus(200);
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).send(err);
//   }
// });

module.exports = router;
