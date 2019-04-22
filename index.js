const http = require('http')

http.createServer((req, res) => {
    console.log(req);
    return res.end('Hello!')
}).listen(3000);