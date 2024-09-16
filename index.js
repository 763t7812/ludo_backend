const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const app = express();


require('dotenv').config();



app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

// Set up GridFS (if you're using it)
let gfs;
const conn = mongoose.connection;
conn.once('open', () => {
    gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'uploads'
    });
});

// Middleware
app.use(express.json());

// Define Routes
app.use('/api/auth', require('./routes/userRoutes')); // Authentication routes
app.use('/api/admin', require('./routes/adminRoutes')); // Admin routes
app.use('/api/contest', require('./routes/contestRoutes')); // Product routes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/banners', require('./routes/bannerRoutes'));
app.use('/api/wallet', require("./routes/walletRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;
