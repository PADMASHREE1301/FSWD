const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html explicitly if needed
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'ex_4.html'));
});

// Handle form submission
app.post('/submit', (req, res) => {
    const formData = req.body;

    // Read existing data file or start with an empty array
    let existingData = [];
    if (fs.existsSync(DATA_FILE)) {
        existingData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    }

    // Append new data
    existingData.push(formData);

    // Save to JSON file
    fs.writeFileSync(DATA_FILE, JSON.stringify(existingData, null, 2));

    res.send('<h2>Form submitted successfully!</h2><a href="/">Go Back</a>');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
