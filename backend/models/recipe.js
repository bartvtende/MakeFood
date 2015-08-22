var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecipeSchema = new Schema({
    userId: Schema.Types.ObjectId,
    name: String,
    description: String,
    photos: [],
    ingredients: [],
    steps: [],
    category: String,
    amountOfPersons: Number,
    calories: Number,
    time: Number,
    difficulty: Number,
    created: { type: Date, default: Date.now }
}, { versionKey: false });

mongoose.model('Recipe', RecipeSchema);

module.exports = mongoose.model('Recipe');