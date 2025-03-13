require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());



app.use(cors());



const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
    console.error("❌ MONGO_URI is not set in .env file");
    process.exit(1);
}

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error(err));

// Customer Schema
const CustomerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },
    mobile: { type: String, required: true }
});
const Customer = mongoose.model('Customer', CustomerSchema);

// Create
app.post('/customers', async (req, res) => {
    try {
        const newCustomer = new Customer(req.body);
        await newCustomer.save();
        res.json(newCustomer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Read
app.get('/customers', async (req, res) => {
    const customers = await Customer.find();
    res.json(customers);
});

// Update
app.put('/customers/:id', async (req, res) => {

    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedCustomer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete
app.delete('/customers/:id', async (req, res) => {
    try {
        await Customer.findByIdAndDelete(req.params.id);
        res.json({ message: 'Customer deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(5000, () => console.log('🚀 Server running on port 5000'));


