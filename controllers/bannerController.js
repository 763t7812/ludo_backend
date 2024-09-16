const Banner = require('../models/bannerModel');
const fs = require('fs');
const path = require('path');

// CREATE a new banner
exports.createBanner = async (req, res) => {
    try {
        const { title } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

        if (!imageUrl) {
            return res.status(400).json({ message: 'No image uploaded' });
        }

        const newBanner = new Banner({
            title,
            imageUrl
        });

        await newBanner.save();
        res.status(201).json({ message: 'Banner created successfully', banner: newBanner });
    } catch (error) {
        res.status(500).json({ message: 'Error creating banner', error });
    }
};

// READ all banners
exports.getAllBanners = async (req, res) => {
    try {
        const banners = await Banner.find();
        res.status(200).json(banners);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching banners', error });
    }
};

// READ a single banner by ID
exports.getBannerById = async (req, res) => {
    try {
        const banner = await Banner.findById(req.params.id);
        if (!banner) {
            return res.status(404).json({ message: 'Banner not found' });
        }
        res.status(200).json(banner);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching banner', error });
    }
};

// UPDATE a banner by ID
exports.updateBanner = async (req, res) => {
    try {
        // Find the banner by ID
        const banner = await Banner.findById(req.params.id);
        if (!banner) {
            return res.status(404).json({ message: 'Banner not found' });
        }

        // Update fields
        const { title, isActive } = req.body;

        // Update title and isActive only if provided
        if (title) banner.title = title;
        if (typeof isActive === 'boolean') banner.isActive = isActive;

        // Handle image update if a new file is uploaded
        if (req.file) {
            // Delete the old image file
            fs.unlinkSync(path.join(__dirname, '..', banner.imageUrl));
            // Update imageUrl with the new file path
            banner.imageUrl = `/uploads/${req.file.filename}`;
        }

        // Save the updated banner
        await banner.save();
        res.status(200).json({ message: 'Banner updated successfully', banner });
    } catch (error) {
        res.status(500).json({ message: 'Error updating banner', error });
    }
};
// DELETE a banner by ID
exports.deleteBanner = async (req, res) => {
    try {
        const banner = await Banner.findByIdAndDelete(req.params.id);
        if (!banner) {
            return res.status(404).json({ message: 'Banner not found' });
        }

        // Delete the image file
        fs.unlinkSync(path.join(__dirname, '..', banner.imageUrl));
        res.status(200).json({ message: 'Banner deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting banner', error });
    }
};
