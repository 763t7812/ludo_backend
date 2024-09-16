
// const User = require('../models/userModel');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// // @desc    Register a new user
// // @route   POST /api/auth/addemploye
// // @access  Public

// exports.createEmploye = async (req, res) => {
//     const { name, email, password } = req.body;

//     try {
//         let user = await User.findOne({ email });

//         if (user) {
//             return res.status(400).json({ msg: 'User already exists' });
//         }

//         user = new User({
//             name,
//             email,
//             password,
//         });

//         await user.save();

//         const payload = {
//             user: {
//                 id: user.id,
//                 role: user.role
//             }
//         };

//         jwt.sign(
//             payload,
//             process.env.JWT_SECRET,
//             { expiresIn: "1000h" },
//             (err, token) => {
//                 if (err) throw err;
//                 res.json({ token });
//             }
//         );
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// };

// // @desc    Authenticate user & get token
// // @route   POST /api/auth/login
// // @access  Public
// exports.login = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         let user = await User.findOne({ email });

//         if (!user) {
//             console.log("User not found");
//             return res.status(400).json({ msg: 'Invalid Credentials' });
//         }

//         console.log("User found:", user);

//         const isMatch = await bcrypt.compare(password, user.password);

//         if (!isMatch) {
//             console.log("Password does not match");
//             return res.status(400).json({ msg: 'Invalid Credentials' });
//         }

//         const payload = {
//             user: {
//                 id: user.id,
//                 role: user.role
//             }
//         };

//         jwt.sign(
//             payload,
//             process.env.JWT_SECRET || jwtToken,
//             { expiresIn: 360000 },
//             (err, token) => {
//                 if (err) throw err;

//                 const userWithoutPassword = {
//                     id: user.id,
//                     email: user.email,
//                     role: user.role,
//                     name: user.name,
//                     // Add other fields as necessary
//                 };

//                 res.json({
//                     token,
//                     user: userWithoutPassword
//                 });
//             }
//         );
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// };

// // @desc    Get all users
// // @route   GET /api/auth/users
// // @access  Private
// exports.getAllUsers = async (req, res) => {
//     try {
//         const users = await User.find().select('-password');
//         res.json(users);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// };

// // @desc    Get user info
// // @route   GET /api/auth/user
// // @access  Private
// exports.getUser = async (req, res) => {
//     try {
//         const user = await User.findById(req.user.id).select('-password');
//         res.json(user);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// };

// // @desc    Edit user info
// // @route   PUT /api/auth/user/:id
// // @access  Private
// exports.editUser = async (req, res) => {
//     const { name, email, role } = req.body;

//     try {
//         let user = await User.findById(req.params.id);

//         if (!user) {
//             return res.status(404).json({ msg: 'User not found' });
//         }

//         user.name = name || user.name;
//         user.email = email || user.email;
//         user.role = role || user.role;

//         await user.save();

//         res.json(user);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// };

// // @desc    Delete user
// // @route   DELETE /api/auth/user/:id
// // @access  Private
// exports.deleteUser = async (req, res) => {
//     try {
//         let user = await User.findById(req.params.id);

//         if (!user) {
//             return res.status(404).json({ msg: 'User not found' });
//         }

//         // The filter parameter should be an object
//         await User.deleteOne({ _id: req.params.id });

//         res.json({ msg: 'User removed' });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// };















const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Function to generate a random OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
};

// @desc    Register a new user
// @route   POST /api/auth/addemploye
// @access  Public
exports.createEmploye = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const otp = generateOTP(); // Generate OTP

        // Temporarily save the user data without creating the account
        user = new User({
            name,
            email,
            password,
            otp, // Save OTP in the user's schema
            isVerified: false, // Account is not verified yet
        });

        await user.save();

        // Log the OTP to the console
        console.log(`OTP for ${email}: ${otp}`);

        res.status(200).json({ msg: 'OTP generated. Please verify.' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            console.log("User not found");
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        console.log("User found:", user);

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            console.log("Password does not match");
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = {
            user: {
                id: user.id,
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET || jwtToken,
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;

                const userWithoutPassword = {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    // Add other fields as necessary
                };

                res.json({
                    token,
                    user: userWithoutPassword
                });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @desc    Get all users
// @route   GET /api/auth/users
// @access  Private
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @desc    Get user info
// @route   GET /api/auth/user
// @access  Private
exports.getUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById({_id: userId}).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @desc    Edit user info
// @route   PUT /api/auth/user/:id
// @access  Private
exports.editUser = async (req, res) => {
    const { name, email, role } = req.body;

    try {
        let user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.role = role || user.role;

        await user.save();

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @desc    Delete user
// @route   DELETE /api/auth/user/:id
// @access  Private
exports.deleteUser = async (req, res) => {
    try {
        let user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // The filter parameter should be an object
        await User.deleteOne({ _id: req.params.id });

        res.json({ msg: 'User removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    console.log("Email:", email, "OTP:", otp); // Log email and OTP to the console

    try {
        const user = await User.findOne({ email });

        if (!user) {
            console.log("User not found for email:", email); // Log if user not found
            return res.status(400).json({ msg: 'User not found' });
        }

        if (user.otp !== otp) {
            console.log("Invalid OTP for email:", email); // Log invalid OTP
            return res.status(400).json({ msg: 'Invalid OTP' });
        }

        // OTP matches, activate the account
        user.isVerified = true;
        user.otp = undefined; // Clear OTP after verification

        await user.save();

        const payload = {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            }
        };

        // Generate JWT token
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: "1000h" },
            (err, token) => {
                if (err) throw err;

                // Log success message and token
                console.log("OTP verified successfully. User logged in:", user.name);
                console.log("Generated Token:", token);

                // Respond with the token and success message
                res.json({ 
                    msg: 'Login successfully', 
                    token 
                });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};



// @desc    Resend OTP
// @route   POST /api/auth/resend-otp
// @access  Public
exports.resendOTP = async (req, res) => {
    const { email } = req.body;
        console.log(email)
    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }

        if (user.isVerified) {
            return res.status(400).json({ msg: 'User is already verified' });
        }

        // Generate a new OTP
        const otp = generateOTP();
        user.otp = otp;
        await user.save();

        // Log the new OTP to the console
        console.log(`New OTP for ${email}: ${otp}`);

        res.status(200).json({ msg: 'New OTP generated. Please verify.' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
