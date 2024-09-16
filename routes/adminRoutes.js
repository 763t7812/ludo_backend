const express = require('express');
const router = express.Router();
const {
  createAdmin,
  getAllAdmins,
  getAdminById,
  editAdmin,
  deleteAdmin,
  loginAdmin // Add loginAdmin controller
} = require('../controllers/adminController');

// @route   POST /api/admin/create
// @desc    Create a new admin
// @access  Private/Admin
router.post('/create', createAdmin);

// @route   POST /api/admin/login
// @desc    Login admin and return token
// @access  Public
router.post('/login', loginAdmin); // Login route

// @route   GET /api/admin/admins
// @desc    Get all admins
// @access  Private/Admin
router.get('/admins', getAllAdmins);

// @route   GET /api/admin/admin/:id
// @desc    Get an admin by ID
// @access  Private/Admin
router.get('/admin/:id', getAdminById);

// @route   PUT /api/admin/edit/:id
// @desc    Edit an admin by ID
// @access  Private/Admin
router.put('/edit/:id', editAdmin);

// @route   DELETE /api/admin/admin/:id
// @desc    Delete an admin by ID
// @access  Private/Admin
router.delete('/admin/:id', deleteAdmin);

module.exports = router;
