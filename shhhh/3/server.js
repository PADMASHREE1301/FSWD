const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer((req, res) => {
    const filePath = path.join(__dirname, 'public', req.url === '/' ? 'ex3.html' : req.url);
   // const ext = path.extname(filePath);
    const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript' };

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end('<h1>404 Not Found</h1>');
        } else {
            res.writeHead(200);
            res.end(data);
        }
    });
}).listen(3000, () => console.log('http://localhost:3000'));
