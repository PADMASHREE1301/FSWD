require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// MySQL Database Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.error("❌ MySQL Connection Error:", err.message);
        process.exit(1);
    }
    console.log('✅ MySQL Connected');
});

// Create a Customer
app.post('/customers', (req, res) => {
    const { name, city, mobile } = req.body;
    const sql = 'INSERT INTO customers (name, city, mobile) VALUES (?, ?, ?)';
    db.query(sql, [name, city, mobile], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: result.insertId, name, city, mobile });
    });
});

// Get All Customers
app.get('/customers', (req, res) => {
    const sql = 'SELECT * FROM customers';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Update Customer
app.put('/customers/:id', (req, res) => {
    const { name, city, mobile } = req.body;
    const sql = 'UPDATE customers SET name = ?, city = ?, mobile = ? WHERE id = ?';
    db.query(sql, [name, city, mobile, req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Customer updated successfully' });
    });
});

// Delete Customer
app.delete('/customers/:id', (req, res) => {
    const sql = 'DELETE FROM customers WHERE id = ?';
    db.query(sql, [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Customer deleted successfully' });
    });
});

app.listen(5000, () => console.log('🚀 Server running on port 5000'));
