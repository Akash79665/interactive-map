const express = require('express');
const router = express.Router();
const Location = require('../models/Location');

// GET all locations
router.get('/', async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET locations by category
router.get('/category/:category', async (req, res) => {
  try {
    const locations = await Location.find({ category: req.params.category });
    res.json(locations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// SEARCH locations by name
router.get('/search/:query', async (req, res) => {
  try {
    const locations = await Location.find({
      name: { $regex: req.params.query, $options: 'i' }
    });
    res.json(locations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single location
router.get('/:id', async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) return res.status(404).json({ message: 'Location not found' });
    res.json(location);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create new location
router.post('/', async (req, res) => {
  const location = new Location({
    name: req.body.name,
    category: req.body.category,
    description: req.body.description,
    coordinates: req.body.coordinates,
    image: req.body.image,
    address: req.body.address
  });

  try {
    const newLocation = await location.save();
    res.status(201).json(newLocation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// SEED initial data (for testing)
router.post('/seed', async (req, res) => {
  const seedData = [
    {
      name: "Deekshabhoomi",
      category: "landmark",
      description: "A sacred monument and Buddhist landmark in Nagpur",
      coordinates: { lat: 21.1306, lng: 79.0687 },
      image: "https://images.unsplash.com/photo-1590077428593-a55bb07c4665?w=300",
      address: "Nagpur, Maharashtra"
    },
    {
      name: "Sitabuldi Fort",
      category: "landmark",
      description: "Historic fort in the heart of Nagpur city",
      coordinates: { lat: 21.1458, lng: 79.0882 },
      image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=300",
      address: "Sitabuldi, Nagpur"
    },
    {
      name: "Ambazari Lake",
      category: "park",
      description: "Beautiful lake with gardens and boating facilities",
      coordinates: { lat: 21.1185, lng: 79.0294 },
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300",
      address: "Ambazari, Nagpur"
    },
    {
      name: "Raman Science Centre",
      category: "museum",
      description: "Interactive science museum with planetarium",
      coordinates: { lat: 21.1321, lng: 79.0880 },
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300",
      address: "Civil Lines, Nagpur"
    },
    {
      name: "Haldiram's Restaurant",
      category: "restaurant",
      description: "Famous vegetarian restaurant known for sweets and snacks",
      coordinates: { lat: 21.1454, lng: 79.0910 },
      image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=300",
      address: "Sadar, Nagpur"
    },
    {
      name: "Seminary Hills",
      category: "park",
      description: "Scenic hilltop with temples and greenery",
      coordinates: { lat: 21.1116, lng: 79.0547 },
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300",
      address: "Seminary Hills, Nagpur"
    },
    {
      name: "Zero Mile Stone",
      category: "landmark",
      description: "Geographic center of India monument",
      coordinates: { lat: 21.1390, lng: 79.0819 },
      image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=300",
      address: "Nagpur, Maharashtra"
    }
  ];

  try {
    await Location.deleteMany({});
    const locations = await Location.insertMany(seedData);
    res.status(201).json({ message: 'Database seeded!', locations });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;