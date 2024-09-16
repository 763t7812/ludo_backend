const Admin = require('../models/adminModal');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Create a new admin
const createAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const admin = new Admin({
      name,
      email,
      password,
      role: role || 'admin',
    });

    await admin.save();
    res.status(201).json({ message: 'Admin created successfully', admin });
  } catch (error) {
    res.status(400).json({ message: 'Error creating admin', error });
  }
};

// Admin login
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    res.status(200).json({
      token, // Return token to the client
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all admins
const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving admins', error });
  }
};

// Get a specific admin by ID
const getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) return res.status(404).json({ message: 'Admin not found' });
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving admin', error });
  }
};

// Edit admin info
const editAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const admin = await Admin.findById(req.params.id);

    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    admin.name = name || admin.name;
    admin.email = email || admin.email;
    if (password) admin.password = password;  // Only update password if provided
    admin.role = role || admin.role;

    await admin.save();
    res.status(200).json({ message: 'Admin updated successfully', admin });
  } catch (error) {
    res.status(400).json({ message: 'Error updating admin', error });
  }
};

// Delete an admin
const deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);
    if (!admin) return res.status(404).json({ message: 'Admin not found' });
    res.status(200).json({ message: 'Admin deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting admin', error });
  }
};

module.exports = {
  createAdmin,
  loginAdmin, // Export loginAdmin controller
  getAllAdmins,
  getAdminById,
  editAdmin,
  deleteAdmin
};
