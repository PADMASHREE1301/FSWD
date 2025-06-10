const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));  

app.post('/submit', (req, res) => {
  let data = [];

  if (fs.existsSync(DATA_FILE)) {
    const fileContent = fs.readFileSync(DATA_FILE, 'utf-8');

    data = JSON.parse(fileContent);
  } else {
    data = [];
  }

  data.push(req.body);  

  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

  res.send('<h2>Form Submitted Successfully!</h2><a href="/">Go Back</a>');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
