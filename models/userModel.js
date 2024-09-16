const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    otp: {
        type: String, // Store OTP here
        required: false
    },
    isVerified: {
        type: Boolean,
        default: false // User is not verified until OTP is correct
    },
    totalMatches: {
        type: Number,
        default: 0 // Initialize with 0
    },
    wonMatch: {
        type: Number,
        default: 0 // Initialize with 0
    },
    totalEarning: {
        type: Number,
        default: 0 // Initialize with 0
    },
    avatar: {
        type: String,
        default: '' // Default empty string for avatar, you can modify it based on your needs (e.g., a default image URL)
    },
    state:{
        type:String,
        default:""
    },
    phoneNumber:{
        type: String,
        default:""
    },
    userName:{
        type:String,
        unique: true
    }
});

// Encrypt password before saving
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('User', UserSchema);
