const express = require('express');
const router = express.Router();
const query = require('../lib/query.js');
let q = new query();

router.get('/logout', (request, response)=>
{   
    if(request.session.isLogin)
    {
        request.session.destroy((err)=>
        {
            response.redirect('/');
        });
    }
    else
    {
        response.redirect('/process/error/error_logout');
    }
})

router.post('/login', (request, response) => {
    if (!request.session.isLogin) {
        let data = request.body;
        q.loginUser(data['id'], data['password'], (res) => {
            if (res == 0) {
                response.redirect('/process/error/INVALID_PASSWORD');
            } else {
                request.session.id = data['id'];
                request.session.password = data['password'];
                request.session.name = data['name'];
                request.session.isLogin = true;
                request
                    .session
                    .save((err) => {
                        response.redirect('/');
                    });

            }
        });
    } else {
        response.redirect('/process/error/already_logged_in');
    }
});

router.post('/create', (request, response) => {
    if (!request.session.isLogin) {
        let data = request.body;
        q.findUser(data['name'], data['id'], (res) => {
            if (res > 0) {
                response.redirect('/process/error/HAS_ID');
            } else {
                q.createUser(data['name'], data['id'], data['password'], () => {
                    response.redirect('/');
                });
            }
        });
    } else {
        response.redirect('/process/error/already_logged_in');
    }
});

router.get('/error/:errortype', (request, response) => {
    response.send(
        `<script>if(! alert("${request.params.errortype}")) document.location = "http://127.0.0.1:3000/";</script>`
    );
});

module.exports = router;