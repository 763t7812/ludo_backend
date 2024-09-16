const mongoose = require('mongoose');

const ContestSchema = new mongoose.Schema({
    contestName: {
        type: String,
        required: true
    },
    firstPrize: {
        type: Number,
        required: true
    },
    maxEntries: {
        type: Number,
        required: true
    },
    currentEntries: {
        type: Number,
        default: 0
    },
    prizePool: {
        type: Number,
        required: true
    },
    entryFee: {
        type: Number,
        required: true
    },
    closingTime: {
        type: Date,
        required: true
    },
    currency: {
        type: String,
        default: 'INR'
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Contest', ContestSchema);
