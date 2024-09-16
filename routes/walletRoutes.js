// /routes/walletRoutes.js
const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletController');

// Define routes for CRUD operations
router.post('/', walletController.createWallet);           // Create
router.get('/', walletController.getAllWallets);           // Read all
router.get('/:id', walletController.getWalletById);       // Read by ID
router.put('/:id', walletController.updateWallet);        // Update by ID
router.delete('/:id', walletController.deleteWallet);     // Delete by ID

module.exports = router;
