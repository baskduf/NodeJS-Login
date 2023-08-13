const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/create', (request, response) => {
    if (!request.session.isLogin) {
        fs.readFile('./html/create.html', 'utf-8', (err, data) => {
            response.send(data);
        });
    } else {
        fs.readFile('./html/main.html', 'utf-8', (err, data) => {
            response.send(data);
        });
    }
});

router.get('/', (request, response) => {
    if (!request.session.isLogin) {
        fs.readFile('./html/login.html', 'utf-8', (err, data) => {
            response.send(data);
        });
    } else {
        fs.readFile('./html/main.html', 'utf-8', (err, data) => {
            response.send(data);
        });
    }

});

module.exports = router;