module.exports = function (app, q) {
    
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function (user, cb) {
        return cb(null, {id:user.id, password:user.password});
    });

    passport.deserializeUser(function (user, cb) {
        return cb(null, {id:user.id, password:user.password});
    });

    passport.use('local',new LocalStrategy({usernameField:"id", passwordField:"password"}, function (username, password, cb) {
        q.loginUser(username,password, (res) => {
            if (res == 0) {
                //failed login
                return cb(null, false, {message:"failed login"});
            } else {
                //sucess login
                console.log(1);
                return cb(null, {id:username, "password":password});
            }
        });
    }));

    return passport;
}