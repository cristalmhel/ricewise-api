const bcrypt = require('bcrypt');
const User = require('../models/user');

// User Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        res.json({ message: 'Login successful', user: { id: user._id, email: user.email } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get User by Email
exports.getUserByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({ email }, '-password'); // Exclude password
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Change Password by Email
exports.changePassword = async (req, res) => {
    try {
        const { email, currentPassword, newPassword } = req.body;
        if (!email || !currentPassword || !newPassword) {
            return res.status(400).json({ message: 'Email, current password, and new password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        res.json({ message: 'Password changed successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const { email, password, fullname, region, province, city, barangay } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user with all fields
        const user = new User({
            email,
            password: hashedPassword,
            fullname: fullname || undefined, // Optional field, set to undefined if not provided
            region: region || undefined,
            province: province || undefined,
            city: city || undefined,
            barangay: barangay || undefined
        });

        const savedUser = await user.save();

        // Return created user's id and email
        res.status(201).json({ id: savedUser._id, email: savedUser.email });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getAllUSers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching users: ' + err.message });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        // Validate input
        if (!email || !newPassword) {
            return res.status(400).json({ message: 'Email and new password are required' });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update user password
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (err) {
        res.status(500).json({ message: 'Error resetting password: ' + err.message });
    }
};

exports.updateUserByEmail = async (req, res) => {
    try {
        const { email, fullname, region, province, city, barangay } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update only provided fields, excluding password
        if (fullname !== undefined) user.fullname = fullname;
        if (region !== undefined) user.region = region;
        if (province !== undefined) user.province = province;
        if (city !== undefined) user.city = city;
        if (barangay !== undefined) user.barangay = barangay;

        await user.save();

        res.status(200).json({ message: 'User updated successfully', id: user._id, email: user.email });
    } catch (err) {
        res.status(500).json({ message: 'Error updating user: ' + err.message });
    }
};

exports.deactivateUser = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.deactivated) {
            return res.status(400).json({ message: 'User is already deactivated' });
        }

        user.deactivated = true;
        await user.save();

        res.status(200).json({ message: 'User deactivated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deactivating user: ' + err.message });
    }
};