const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// @route   GET /api/events
// @desc    Get events. Optional query ?chapterId=...
router.get('/', async (req, res) => {
  try {
    const query = {};
    if (req.query.chapterId) {
      query.chapterId = req.query.chapterId;
    }

    // Sort by Date ascending
    const events = await Event.find(query)
      .populate('chapterId') // To get schoolName
      .sort({ dateTime: 1 });
      
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;