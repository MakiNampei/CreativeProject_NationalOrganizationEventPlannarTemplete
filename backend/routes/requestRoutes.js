const express = require('express');
const router = express.Router();
const CollabRequest = require('../models/CollabRequest');
const { protect } = require('../middleware/authMiddleware');
const { requireAdmin } = require('../middleware/roleMiddleware');

// @route   POST /api/requests
// @desc    Public or Student: Create a collab request
router.post('/', async (req, res) => {
  const { eventId, fromOrgName, fromContactEmail, message } = req.body;
  try {
    const newRequest = await CollabRequest.create({
      eventId,
      fromOrgName,
      fromContactEmail,
      message,
      status: 'pending'
    });
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/requests
// @desc    HQ Admin: View all requests
router.get('/', protect, requireAdmin, async (req, res) => {
  try {
    const requests = await CollabRequest.find()
      .populate({
        path: 'eventId',
        select: 'title' // Only get the title of the event
      });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PATCH /api/requests/:id
// @desc    HQ Admin: Approve or Reject
router.patch('/:id', protect, requireAdmin, async (req, res) => {
  const { status } = req.body; // 'approved' or 'rejected'
  
  try {
    const request = await CollabRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    request.status = status;
    await request.save();
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;