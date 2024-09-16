const Wallet = require('../models/walletModel');
const mongoose = require('mongoose');

// Helper function to check if the provided ID is a valid ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Create a new wallet
exports.createWallet = async (req, res) => {
  try {
    const { userId, totalBalance, deposit, cashback, winnings, rushRewards } = req.body;

    const wallet = new Wallet({ userId, totalBalance, deposit, cashback, winnings, rushRewards });
    await wallet.save();

    res.status(201).json(wallet);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create wallet', error });
  }
};

// Get all wallets
exports.getAllWallets = async (req, res) => {
  try {
    const wallets = await Wallet.find();
    res.status(200).json(wallets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching wallets', error });
  }
};

// Get wallet by ObjectId or userId
exports.getWalletById = async (req, res) => {
  try {
    const id = req.params.id;
    let wallet;

    // First, check if the ID is a valid ObjectId
    if (isValidObjectId(id)) {
      // Try finding by _id (the document's ObjectId)
      wallet = await Wallet.findById(id);
    }

    // If no wallet is found by _id, treat the id as userId and search by userId
    if (!wallet) {
      wallet = await Wallet.findOne({ userId: id });
    }

    if (!wallet) return res.status(404).json({ message: 'Wallet not found' });

    res.status(200).json(wallet);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching wallet', error });
  }
};

// Update wallet by ObjectId or userId
exports.updateWallet = async (req, res) => {
  try {
    const id = req.params.id;
    let updatedWallet;

    // First, check if the ID is a valid ObjectId
    if (isValidObjectId(id)) {
      // Try updating by _id
      updatedWallet = await Wallet.findByIdAndUpdate(id, req.body, { new: true });
    }

    // If not found by _id, try updating by userId
    if (!updatedWallet) {
      updatedWallet = await Wallet.findOneAndUpdate({ userId: id }, req.body, { new: true });
    }

    if (!updatedWallet) return res.status(404).json({ message: 'Wallet not found' });

    res.status(200).json(updatedWallet);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update wallet', error });
  }
};

// Delete wallet by ObjectId or userId
exports.deleteWallet = async (req, res) => {
  try {
    const id = req.params.id;
    let wallet;

    // First, check if the ID is a valid ObjectId
    if (isValidObjectId(id)) {
      // Try deleting by _id
      wallet = await Wallet.findByIdAndDelete(id);
    }

    // If not found by _id, try deleting by userId
    if (!wallet) {
      wallet = await Wallet.findOneAndDelete({ userId: id });
    }

    if (!wallet) return res.status(404).json({ message: 'Wallet not found' });

    res.status(200).json({ message: 'Wallet deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete wallet', error });
  }
};