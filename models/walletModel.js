const mongoose = require('mongoose');

// Define the Wallet schema
const walletSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },  // Reference to user
  totalBalance: { type: Number, required: true, default: 0 },
  deposit: { type: Number, required: true, default: 0 },
  cashback: { type: Number, required: true, default: 0 },
  winnings: { type: Number, required: true, default: 0 },
  rushRewards: { type: Number, default: 0 },
}, { timestamps: true });

// Create and export the model
const Wallet = mongoose.model('Wallet', walletSchema);
module.exports = Wallet;