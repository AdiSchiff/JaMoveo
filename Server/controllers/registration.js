const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const signup = async (req, res) => {
  const { username, password, instrument, role } = req.body;

  try {
    // Check if the user already exist
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
      instrument,
      role: role === 'admin' ? 'admin' : 'player'
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Error during signup', error });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exist
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        instrument: user.instrument
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token, role: user.role, instrument: user.instrument });

  } catch (error) {
    res.status(500).json({ message: 'Error during login', error });
  }
};

module.exports = { signup, login };
