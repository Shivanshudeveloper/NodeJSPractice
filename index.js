// Logger JS
// const Logger = require('./logger');
// const logger = new Logger();
// logger.on('message', (data) => {
//     console.log("Called Listner", data);
// })
const http = require('http');
const path = require('path');
const fs = require('fs');
const server = http.createServer((req, res) => {
    // if (req.url === '/') {
    //     fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
    //         if (err) throw err;
    //         res.writeHead(200, { 'Content-Type': 'text/html' })
    //         res.end(content);
    //     })
    // } else if (req.url === '/about') {
    //     fs.readFile(path.join(__dirname, 'public', 'about.html'), (err, content) => {
    //         if (err) throw err;
    //         res.writeHead(200, { 'Content-Type': 'text/html' })
    //         res.end(content)
    //     })
    // } else if (req.url === '/api') {
    //     const users = [
    //         { name: "Bob Smith", age: 43 },
    //         { name: "Mike Smith", age: 43 }
    //     ];
    //     res.writeHead(200, { 'Content-Type': 'application/json' })
    //     res.end(JSON.stringify(users))
    // } 


    // BUILD FILE PATH
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
    // Extension of file
    let extname = path.extname(filePath);
    let contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript'
            break;
        case '.html':
            contentType = 'text/html'
            break;
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code == 'EN0ENT') {
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf8');
                })
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf8');
        }
    })
})
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log("Server on Port", PORT));