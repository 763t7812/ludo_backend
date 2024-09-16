const express = require('express');
const router = express.Router();
const contestController = require('../controllers/contestController');

// Get all contests
router.get('/', contestController.getAllContests);

// Get contest by ID
router.get('/:id', contestController.getContestById);

// Create a new contest
router.post('/', contestController.createContest);

// Update contest by ID
router.put('/:id', contestController.updateContest);

// Delete contest by ID
router.delete('/:id', contestController.deleteContest);

router.put('/isActive/:id', contestController.updateIsActive);

module.exports = router;
