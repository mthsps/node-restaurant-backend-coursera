const http = require('http');

const hostname = 'localhost';
const port = 3000;
const fs = require('fs');
const path = require('path');
const { fileURLToPath } = require('url');

const server = http.createServer((request, response) => {
    console.log('Request for ' + request.url + ' by method ' + request.method);

    if (request.method === 'GET') {
        var fileUrl;
        if (request.url == '/') fileUrl = '/index.html';
        else fileUrl = request.url;

        var filePath = path.resolve('./public' + fileUrl);
        const fileExt = path.extname(filePath);
        if (fileExt == '.html') {
            fs.exists(filePath, (exists) => {
                if (!exists) {
                    response.statusCode = 404;
                    response.setHeader('Content-Type', 'text/html');
                    response.end('<html><body><h1>Error 404: ' + fileUrl +
                        ' not found</h1></body></html>')
                    return;
                }
                response.statusCode = 200;
                response.setHeader('Content-Type', 'text/html');
                fs.createReadStream(filePath).pipe(response);
            });
        } else {
            response.statusCode = 404;
            response.setHeader('Content-Type', 'text/html');
            response.end('<html><body><h1>Error 404: ' + fileUrl +
                ' not a HTML file</h1></body></html>');
        }
    } else {
        response.statusCode = 404;
        response.setHeader('Content-Type', 'text/html');
        response.end('<html><body><h1>Error 404: ' + request.method +
            ' not supported</h1></body></html>');
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});