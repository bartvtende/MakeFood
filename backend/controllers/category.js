var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Recipe = require('../models/recipe');
var auth = require('../controllers/authenticated');

/**
 * Gets all the categories from the user
 */
router.get('/', auth.isAuthenticated, function (req, res) {
    var userId = req.user._id;

    User.findOne({_id: userId}, function (err, user) {
        var categories = user.categories;

        Recipe.aggregate([
            {
                $match: {
                    userId: userId,
                    category: { $ne: null }
                }
            },
            {
                $group: {
                    _id: "$category",
                    count: {$sum: 1}
                }
            }
        ], function (err, result) {
            if (err) res.json(err);
            for (var i = 0; i < categories.length; i++) {
                var found = false;
                for (var j = 0; j < result.length; j++) {
                    if (categories[i] == result[j]._id) {
                        found = true;
                    }
                }
                if (!found) result.push({ _id: categories[i], count: 0 })
            }
            res.json(result);
        });
    });
});

/**
 * Gets all recipes from a specific
 */
router.get('/:name', auth.isAuthenticated, function(req, res) {
    var userId = req.user._id;
    var categoryName = req.params.name;

    Recipe.find({ $and: [{ category: categoryName}, {userId: userId }]}, function(err, recipes) {
        if (err) res.json(err);
        res.json(recipes);
    })
});

/**
 * Deletes a category based on it's name
 */
router.delete('/:name', auth.isAuthenticated, function(req, res) {
    var userId = req.user._id;
    var categoryName = req.params.name;

    User.findOne({ _id: userId }, function(err, user) {
        if (err) res.json(err);
        var categories = user.categories.toObject();

        categories.forEach(function(key, value) {
            if (categories[value] == categoryName) {
                delete categories[value];
            }
        }, this);

        categories = categories.filter(function(n){ return n != undefined });

        user.categories = categories;

        user.save(function(err, newUser) {
            if (err) res.json;
            res.json(newUser);
        })
    })
})

/**
 * Add a category to an users profile
 */
router.post('/', auth.isAuthenticated, function (req, res) {
    var userId = req.user._id;
    var category = req.body.category;
    var categories = [];

    User.findOne({_id: userId}, function (err, user) {
        if (err) {
            res.json(err)
        }
        categories = user.categories;
        var found = false;
        categories.forEach(function (key, value) {
            if (categories[value] == category)
                found = true;
        }, this);

        if (!found) {
            console.log(category);
            categories.push(category);
            console.log(categories);
        }

        User.update({_id: userId}, {$set: {categories: categories}}, function (err, user) {
            res.json([{'message': 'Category added!'}]);
        })
    });
});

module.exports = router;