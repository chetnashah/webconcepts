const http = require('http');

const server = http.createServer((req, res) => {
    console.log('got http request!!!', req.url, req.originalUrl);
    res.write('hello world\n');
    res.end();
});

server.listen(3500);
