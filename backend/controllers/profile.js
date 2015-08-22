var express = require('express');
var router = express.Router();

var auth = require('../controllers/authenticated');
var Recipe = require('../models/recipe');

router.get('/recipe-count', auth.isAuthenticated, function(req, res) {
    var userId = req.user._id;

    Recipe.count({ userId: userId }, function(err, count) {
        if (err) res.json(err);
        res.json(count);
    })
});

module.exports = router;