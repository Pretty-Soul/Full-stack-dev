const http = require("http");

const server = http.createServer((req, res) => {
    
    res.end('hello world from node.js!');
});

server.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});