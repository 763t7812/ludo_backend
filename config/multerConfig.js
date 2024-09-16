const multer = require('multer');
const path = require('path');

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Directory to store the uploaded files
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + path.extname(file.originalname);  // Unique filename with timestamp
        cb(null, uniqueName);
    }
});

// File filter: Only allow jpg, jpeg, and png files
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png/;
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedFileTypes.test(file.mimetype);

    if (mimetype && extname) {
        cb(null, true);
    } else {
        cb(new Error('Only images (jpeg, jpg, png) are allowed!'));
    }
};

// Initialize Multer with storage and file filter settings
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }  // Maximum file size: 5MB
});

module.exports = upload;
