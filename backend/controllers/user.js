var express = require('express');
var router = express.Router();

var User = require('../models/user');
var bcrypt = require('bcryptjs');
var moment = require('moment');
var jwt = require('jwt-simple');
var config = require('../config');

router.post('/login', function(req, res) {
    User.findOne({ email: req.body.email }, '+password', function(err, user) {
        if (!user)
            return res.status(401).send({ message: { email: 'Incorrect email' } });

        bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
            if (!isMatch)
                return res.status(401).send({ message: { password: 'Incorrect password' } });

            user = user.toObject();
            delete user.password;

            var token = createToken(user);
            res.send({
                token: token,
                user: user
            });
        });
    });
});

router.post('/signup', function(req, res) {
    User.findOne({ email: req.body.email }, function(err, existingUser) {
        if (existingUser)
            return res.status(409).send({ message: 'Email is already taken.' });

        var user = new User({
            email: req.body.email,
            password: req.body.password,
            fullName: req.body.fullName,
            picture: req.body.picture
        });

        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
                user.password = hash;

                user.save(function() {
                    var token = createToken(user);
                    res.send({
                        token: token,
                        user: user
                    });
                });
            });
        });
    });
});

router.post('/auth/instagram', function(req, res) {
    var accessTokenUrl = 'https://api.instagram.com/oauth/access_token';

    var params = {
        client_id: req.body.clientId,
        redirect_uri: req.body.redirectUri,
        client_secret: config.clientSecret,
        code: req.body.code,
        grant_type: 'authorization_code'
    };

});

function createToken(user) {
    var payload = {
        exp: moment().add(1000, 'days').unix(),
        iat: moment().unix(),
        sub: user._id
    };

    return jwt.encode(payload, config.tokenSecret);
}

module.exports = router;