const express = require('express');
const router = express.Router();
const Chapter = require('../models/Chapter');

// @route   GET /api/chapters
// @desc    Get all chapters (with organization details populated)
router.get('/', async (req, res) => {
  try {
    const chapters = await Chapter.find().populate('organizationId', 'name');
    res.json(chapters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/chapters/:id
// @desc    Get single chapter
router.get('/:id', async (req, res) => {
  try {
    const chapter = await Chapter.findById(req.params.id).populate('organizationId');
    if (chapter) {
      res.json(chapter);
    } else {
      res.status(404).json({ message: 'Chapter not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;