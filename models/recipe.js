const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
    title: { type: String, required: true },
    liked: { type: Boolean, required : true , default: false},
    bookmarked: { type: Boolean, required : true , default: false}, 
    ingredients: { type: [String], required: true },
    instructions: { type: [{ etape :Number, content: String}], required: true },
    timePreparation: { type: String, required: true },
    categorie: { type: String, required: true },
    userId: { type: String, required: true },
    imageUrl: { type: String, required: true },
    ustensils: { type: [String], required: true },
    anecdote: { type: String, required: false },
});

module.exports = mongoose.model('Recipe', recipeSchema);