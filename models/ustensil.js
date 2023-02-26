const mongoose = require('mongoose');


const ustensilSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
})

module.exports = mongoose.model('Ustensil', ustensilSchema);