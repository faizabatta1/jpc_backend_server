const bcrypt = require('bcrypt');
const User = require('../models/user_model');
const jwt = require('jsonwebtoken');
const { sendResetPasswordEmail, generateOTP } = require('../utils/emailService');


exports.getAllUsers = async (req, res) => {
  try {
    // const token = req.headers.token;
    // const decodedToken = jwt.verify(token, process.env.__PRIVATE_ADMIN_TOKEN_PASSWORD__);
    // const role = decodedToken.role;

    // if (role !== 'admin') {
    //   return res.status(403).json({ error: 'Forbidden' });
    // }
    const users = await User.find({}, { __v: false });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.register = async (req, res) => {
  try {
    const { username, email, password, location, phone } = req.body;
    console.log(req.body);

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
      location: location,
      phone:phone
    });

    const savedUser = await newUser.save();



    return res.status(200).json({ user: savedUser });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);


    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign(
        { userId: user._id, email: user.email, role: 'user' },
        process.env.__PRIVATE_TOKEN_PASSWORD__,
        { expiresIn: '30d' }
      );

      return res.status(200).json({ token: token, user: user });
    } else {
      return res.status(400).json({ error: 'Invalid password' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
  

    const deletedUser = await User.findByIdAndDelete(userId);

    if (deletedUser) {
      return res.status(200).json({ message: 'User deleted successfully' });
    } else {
      return res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email } = req.body;

    const existingUser = await User.findOne({ email: email });

    if (existingUser && existingUser._id.toString() !== userId) {
      return res.status(400).json({ error: 'Email already exists with another user' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name: name, email: email },
      { new: true }
    );

    if (updatedUser) {
      return res.status(200).json(updatedUser);
    } else {
      return res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const fs = require('fs');

exports.uploadImage = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!req.file) {
      log('here')
      return res.status(400).json({ error: 'No image file provided' });
    }

    const image = fs.readFileSync(req.file.path, { encoding: 'base64' });

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { image: image },
      { new: true }
    );

    if (updatedUser) {
      return res.status(200).json(updatedUser);
    } else {
      return res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};
