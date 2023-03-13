const Ingredient = require('../models/ingredient');

// création d'un ingrédient dans la base de données que si l'utilisateur est connecté

exports.createIngredient = (req, res, next) => {
  Ingredient.findOne({ name: req.body.name }, (error, existingIngredient)=> {
  if (error) {
    return res.status(500).json({ error });
  }
    if (existingIngredient) {
        return res.status(400).json({ error: 'Ingrédient déjà existant' });
        }
    const ingredient = new Ingredient({
        name: req.body.name,
    });
    ingredient.save()
        .then(() => res.status(201).json({ message: 'Ingrédient créé !' }))
        .catch(error => res.status(400).json({ error }));
})

}
// récupération de tous les ingrédients de la base de données que si l'utilisateur est connecté


exports.getAllIngredients = (req, res, next) => {
    //const page =  parseInt(req.query.page) || 1;
   // const limit = parseInt(req.query.limit) || 20;
    
    Ingredient.find()
   // .skip((page - 1) * limit)
   // .limit(limit)
    .then(ingredients => res.status(200).json(ingredients))
    .catch(error => res.status(400).json({ error }));
}
