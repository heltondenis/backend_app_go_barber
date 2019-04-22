const express = require('express');

const app = express();

app.get('/', (req, res) => {
    return res.send('Hello World');
});

app.get('/login/:login', (req, res) => {
    return res.send(`Olá, ${req.params.login}`);
});

app.listen(3000);
