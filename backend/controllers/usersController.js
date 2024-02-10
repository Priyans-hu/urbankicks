const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Users } = require('../models/usersModel');

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await Users.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with the hashed password
        const newUser = new Users({ username, email, password: hashedPassword });
        const savedUser = await newUser.save();

        // Generate a JWT token
        const token = jwt.sign({ userId: savedUser._id }, 'your-secret-key', { expiresIn: '2h' });

        // Send the token as a cookie
        res.cookie('jwt', token, { httpOnly: true });

        res.status(201).json({ message: 'User registered successfully', user: savedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await Users.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '24h' });

        // Send the token as a cookie
        res.cookie('jwt', token, { httpOnly: true, secure: true });

        // You can also send the token in the response if needed
        // res.status(200).json({ message: 'Login successful', token });
        res.status(200).json({
            message: 'Login successful',
            user: { email }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const logoutUser = async (req, res) => {
    try {
        // Clear the JWT cookie
        res.clearCookie('jwt');

        // Return a success message
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getUserDetails = async (req, res) => {
    try {
        // Assuming you have the user email available in the request object after authentication
        const { email } = req.body;
        console.log(email);

        // Fetch user details based on the user email
        const userDetails = await Users.findOne({ email });

        if (!userDetails) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Return user details
        res.json({
            id: userDetails._id,
            name: userDetails.name,
            email: userDetails.email,
        });
        console.log(res.json());
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getUserDetails,
};
