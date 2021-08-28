const express = require('express');
const Waste = require('../models/waste');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

// Get wastes by their ids
// router.get('/:id', async (req, res) => {
//  Validate the id provided to know if it is a valid mongoose id type and not just a random string
//   if (isValidObjectId(req.params.id)) {
//     const waste = await Waste.findOne(req.params.id);
//     res.status(200).json({ success: true, data: waste });
//   }
// });

// Post new waste
router.post('/', checkAuth, async (req, res) => {
  try {
    const newWaste = await Waste.create({
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      category: req.body.category,
      datePosted: Date.now(),
      noFavourites: 0,
      postedBy: req.user.id,
      postedByText: 'By ' + req.user.username,
      collected: false,
      // location: {
      //   type : "Point",
      //   coordinates: [null, null]
      // }
    });
    console.log(newWaste);
    req.user.wastesPosted.push(newWaste.id);
    req.user.save();
    res.send(newWaste);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.post('/toggle-favorite/:id', checkAuth, async (req, res) => {
  const wasteId = req.params.id;
  if (req.user.favorites.includes(wasteId)) {
    const index = req.user.favorites.indexOf(wasteId);
    req.user.favorites.splice(index, 1);
  } else {
    req.user.favorites.push(wasteId);
  }
  req.user.save();
  res.sendStatus(200);
});

// Edit a waste
router.put('/:id', checkAuth, async (req, res) => {
  try {
    const waste = await Waste.findById(req.params.id);
    if (req.user.id == waste.postedBy) {
      waste.title = req.body.title;
      waste.description = req.body.description;
      waste.imageUrl = req.body.imageUrl;
      waste.category = req.body.category;
      waste.collected = req.body.collected;
      await waste.save();
      res.sendStatus(200);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// Denote a waste has been collected (which you have created)
router.delete('/:id', checkAuth, async (req, res) => {
  try {
    const existingWaste = await Waste.findById(req.params.id);

    if (req.user.id == exisitingWaste.user.id) {
      existingWaste.collected = true;
      res.sendStatus(200);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// Search for a waste
router.get('/search', async (req, res) => {
  try {
    const results = await Waste.find({
      title: { $regex: req.query.title, $options: 'i' },
    });
    res.send(results);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// filter by category
router.get('/filter', async (req, res) => {
  try {
    console.log(req.query.category);
    const wastesFitting = await Waste.find({ category: req.query.category });
    console.log(wastesFitting);
    res.send(wastesFitting);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// filter by recency
router.get('/recent', async (req, res) => {
  console.log(req.query.ascending);
  const sortedWaste = await Waste.find({ collected: false })
    .sort({ date: req.query.ascending ? -1 : 1 })
    .exec();
  res.send(sortedWaste);
});

// // filter by proximity
// router.get('/proximity', async (req, res) => {
//   const resultsPerPage = 30;
//   const page = req.query.page;
//   const sortedWaste = Waste.find({})
//     .sort(
//       findDistance(req.user.coords, coords)
//     )
//     .limit(resultsPerPage)
//     .skip(resultsPerPage * page);
//   res.send(sortedWaste);
// });
// Get wastes by their ids
router.get('/:id', async (req, res) => {
  //  Validate the id provided to know if it is a valid mongoose id type and not just a random string
  // if (isValidObjectId(req.params.id)) {
  const waste = await Waste.findById(req.params.id);
  res.status(200).send(waste);
  // }
});

module.exports = router;
