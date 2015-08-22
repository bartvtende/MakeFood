var express = require('express');
var router = express.Router();

var auth = require('../controllers/authenticated');
var Recipe = require('../models/recipe');

/**
 * Retrieves all recipes
 */
router.get('/', auth.isAuthenticated, function(req, res) {
    Recipe.find({ userId: req.user._id }, function(err, recipes) {
        if (err) {
            res.json([{error: 'You have no recipes!'}]);
        }
        res.json(recipes);
    });
});

/**
 * Get recipe detail
 */
router.get('/:id', auth.isAuthenticated, function(req, res) {
    var id = req.params.id;

    Recipe.findOne({ $and: [{ _id: id}, {userId: req.user._id }]}, function(err, recipe) {
        if (err)
            res.json([{error: 'Recipe not found!'}]);
        else
            res.json(recipe);
    });
});

/**
 * Delete a recipe
 */
router.delete('/:id', auth.isAuthenticated, function(req, res) {
    var id = req.params.id;

    Recipe.remove({ $and: [{ _id: id}, {userId: req.user._id }]}, function(err, recipe) {
        if (err)
            res.json([{error: 'Couldn\'t delete recipe with ID: ' + id}]);
        else
            res.json([{message: 'Deleted recipe with ID: ' + id}]);
    });
});

/**
 * Create a recipe
 */
router.post('/', auth.isAuthenticated, function(req, res) {
    var ingredients = [];
    var steps = [];
    var userId = req.user._id;

    if (req.body.ingredients != undefined) {
        var temp = req.body.ingredients;

        for (var i = 0; i < temp.length; i++) {
            if (temp[i][i] != undefined) {
                var newItem = {id: i, name: temp[i][i]};
                ingredients.push(newItem);
            }
        }
    }

    if (req.body.steps != undefined) {
        var temp = req.body.steps;

        for (var i = 0; i < temp.length; i++) {
            if (temp[i][i] != undefined) {
                var newItem = {id: i, name: temp[i][i]};
                steps.push(newItem);
            }
        }
    }

    var newRecipe = new Recipe({
        userId: userId,
        name: req.body.name,
        description: req.body.description,
        photos: [req.body.photos],
        ingredients: ingredients,
        steps: steps,
        category: req.body.category,
        amountOfPersons: req.body.amountOfPersons,
        calories: req.body.calories,
        time: req.body.time,
        difficulty: req.body.difficulty
    });

    newRecipe.save(function(err) {
        if (err) { res.json('error') }
        res.json(newRecipe);
    });
});

/**
 * Update a recipe
 */
router.put('/:id', auth.isAuthenticated, function(req, res) {
    var id = req.params.id;
    var userId = req.user._id;

    var ingredients = [];
    var steps = [];

    if (req.body.ingredients != undefined) {
        var temp = req.body.ingredients;

        console.log(temp);

        for (var i = 0; i < temp.length; i++) {
            if (temp[i] != undefined) {
                var newItem = {id: i, name: temp[i][i]};
                ingredients.push(newItem);
            }
        }
    }

    if (req.body.steps != undefined) {
        var temp = req.body.steps;

        for (var i = 0; i < temp.length; i++) {
            if (temp[i] != undefined) {
                var newItem = {id: i, name: temp[i][i]};
                steps.push(newItem);
            }
        }
    }

    var updatedRecipe = {
        userId: userId,
        name: req.body.name,
        description: req.body.description,
        photos: req.body.photos,
        ingredients: ingredients,
        steps: steps,
        category: req.body.category,
        amountOfPersons: req.body.amountOfPersons,
        calories: req.body.calories,
        time: req.body.time,
        difficulty: req.body.difficulty
    };

    if (req.body.name == undefined) {
        delete updatedRecipe.name;
    }
    if (req.body.description == undefined) {
        delete updatedRecipe.name;
    }
    if (req.body.photos == undefined) {
        delete updatedRecipe.name;
    }
    if (ingredients == undefined) {
        delete updatedRecipe.ingredients;
    }
    if (steps == undefined) {
        delete updatedRecipe.name;
    }
    if (req.body.category == undefined) {
        delete updatedRecipe.category;
    }
    if (req.body.amountOfPersons == undefined) {
        delete updatedRecipe.amountOfPersons;
    }
    if (req.body.calories == undefined) {
        delete updatedRecipe.calories;
    }
    if (req.body.time == undefined) {
        delete updatedRecipe.time;
    }
    if (req.body.difficulty == undefined) {
        delete updatedRecipe.difficulty;
    }

    Recipe.update({ $and: [{ _id: id }, { userId: userId }]}, { $set: updatedRecipe }, function(err, recipe) {
        if (err) { return res.json([{error: err}]) };
        res.json(recipe);
    });
});

module.exports = router;