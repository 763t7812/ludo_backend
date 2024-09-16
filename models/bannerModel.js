const mongoose = require('mongoose');

// Define the schema for the banner
const BannerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,   // This will store the path to the uploaded image
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Banner', BannerSchema);
