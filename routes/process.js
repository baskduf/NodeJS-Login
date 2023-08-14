module.exports = function (passport, q) {
    const express = require('express');
    const router = express.Router();
    //const authStatus = require('../lib/auth.js');

    router.get('/logout', (request, response) => {
        if (request.user) {
            request.logOut((err) => {
                request.session.destroy((err)=> {
                    response.redirect('/');
                });
            });
        } else {
            response.redirect('/process/error/error_logout');
        }
    })

    router.post('/login', passport.authenticate('local', {  successRedirect: '/', failureRedirect: '/login', failureMessage: true }));

    router.post('/create', (request, response) => {
        if (!request.user) {
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
            `<script>if(! alert("${request.params.errortype}")) document.location = "/";</script>`
        );
    });
    return router;
}
