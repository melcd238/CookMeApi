const Recipe = require('../models/recipe');

// céation d'une recette dans la base de données en fonction de l'utilisateur connecté 
// chaque utilisateur a accès à ses propres recettes

exports.createRecipe = (req, res, next) => {
    const userId = req.body.userId;
   
    const recipe = new Recipe({
        title: req.body.title,
        liked: false,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        timePreparation: req.body.timePreparation,
        categorie: req.body.categorie,
        userId: userId,
        imageUrl: req.body.imageUrl,
        ustensils: req.body.ustensils,
        anecdote: req.body.anecdote,
    });
    // on sauvegarde la recette dans la base de données
    recipe.save()
        .then(() => res.status(201).json({ message: 'Recette créée !' }))
        .catch(error => res.status(400).json({ error }));
};

// récupération de toutes les recettes de la base de données en fonction de l'utilisateur connecté

exports.getAllRecipes = (req, res, next) => {
    const userId = req.body.userId;
    // on récupère toutes les recettes de la base de données que si le userId correspond à celui de l'utilisateur connecté
    Recipe.find({ userId: userId })
        .then(recipes => res.status(200).json(recipes))
        .catch(error => res.status(400).json({ error }));
};

// récupération d'une recette en fonction de son id que si l'utilisateur connecté est le propriétaire de la recette

exports.getOneRecipe = (req, res, next) => {
    const userId = req.body.userId;
    Recipe.findOne({ _id: req.params.id, userId: userId })
        .then(recipe => res.status(200).json(recipe))
        .catch(error => res.status(404).json({ error }));
}

// suppression d'une recette en fonction de son id que si l'utilisateur connecté est le propriétaire de la recette

exports.deleteRecipe = (req, res, next) => {
    const userId = req.body.userId;
    Recipe.deleteOne({ _id: req.params.id, userId: userId })
        .then(() => res.status(200).json({ message: 'Recette supprimée !' }))
        .catch(error => res.status(400).json({ error }));
}


