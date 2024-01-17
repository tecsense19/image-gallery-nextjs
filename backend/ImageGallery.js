const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors")
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(cors());
const PORT = 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ImageGallery').then(res => {
  console.log("Server connected successfully")
}).catch(err => {
  console.error("Server connecting error", err)
});

// Define User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }
}, {versionKey: false});
const User = new mongoose.model('User', userSchema);

// Register API
app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Create a new user

    const newUser = new User({ username, email, password });
    newUser.save().then(user => {
      res.status(201).json({ success: true, message: 'User registered successfully', user: user});
    }).catch(err => {
      res.status(500).json({ success: false, message: 'Internal Server Error', error: err });
    });

    // res.status(201).json({ success: true, message: 'User registered successfully'});
  } catch (error) {
    // console.error(error);
    // res.status(500).json({ success: false, message: 'Internal Server Error', error: error });
  }
});

// Login API
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the username exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    // const passwordMatch = await bcrypt.compare(password, user.password);
    const passwordMatch = (password === user.password);
    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    } 
    res.status(200).json({ success: true, message: 'Login successful', user: user});
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
