const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();
app.use(bodyParser.json());
app.use(cors());
const PORT = 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/IncomeExpenseManager').then(res => {
  console.log("Server connected successfully")
}).catch(err => {
  console.error("Server connecting error", err)
});

// Define Object Schema
const objectSchema = new mongoose.Schema({
  type: { type: String, required: true },
  name: { type: String, required: true },
  cost: { type: Number, required: true },
  description: { type: String, default: "" }
}, { versionKey: false });

const ObjectModel = mongoose.model('data', objectSchema);

// Add Object API
app.post('/add', async (req, res) => {
  try {
    const { type, name, cost, description } = req.body;

    const newObject = new ObjectModel({ type, name, cost, description });
    newObject.save().then(object => {
      res.status(201).json({ success: true, message: 'Object added successfully', object });
    }).catch(err => {
      res.status(500).json({ success: false, message: 'Internal Server Error', error: err });
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error', error });
  }
});

// Update Object API
app.put('/update/:id', async (req, res) => {
  try {
    const objectId = req.params.id;
    const { type, name, cost, description } = req.body;

    const updatedObject = await ObjectModel.findByIdAndUpdate(objectId, { type, name, cost, description }, { new: true });
    if (!updatedObject) {
      return res.status(404).json({ success: false, message: 'Object not found' });
    }

    res.status(200).json({ success: true, message: 'Object updated successfully', object: updatedObject });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error', error });
  }
});

// Delete Object API
app.delete('/delete/:id', async (req, res) => {
  try {
    const objectId = req.params.id;

    const deletedObject = await ObjectModel.findByIdAndDelete(objectId);
    if (!deletedObject) {
      return res.status(404).json({ success: false, message: 'Object not found' });
    }

    res.status(200).json({ success: true, message: 'Object deleted successfully', object: deletedObject });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error', error });
  }
});

// View Objects API
app.get('/get', async (req, res) => {
  try {
    const objects = await ObjectModel.find();
    res.status(200).json({ success: true, message: 'Objects retrieved successfully', objects });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error', error });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
