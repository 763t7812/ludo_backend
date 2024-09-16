const express = require('express');
const router = express.Router();
const bannerController = require('../controllers/bannerController');
const upload = require('../config/multerConfig');  // Import the multer config for image upload

// Create a banner (with image upload)
router.post('/', upload.single('image'), bannerController.createBanner);

// Get all banners
router.get('/', bannerController.getAllBanners);

// Get a banner by ID
router.get('/:id', bannerController.getBannerById);

// Update a banner (with optional image upload)
router.put('/:id', upload.single('image'), bannerController.updateBanner);

// Delete a banner
router.delete('/:id', bannerController.deleteBanner);

module.exports = router;
