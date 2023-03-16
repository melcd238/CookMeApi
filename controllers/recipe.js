const Recipe = require('../models/recipe');

// céation d'une recette dans la base de données en fonction de l'utilisateur connecté 
// chaque utilisateur a accès à ses propres recettes

exports.createRecipe = (req, res, next) => {
    const userId = req.body.userId;
   
    const recipe = new Recipe({
        title: req.body.title,
        liked: false,
        bookmarked: false,
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
    const page =  parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const search = req.query.search || '';

    const filter = { userId: userId };
    if (search) {
        filter.title = { $regex: new RegExp(search, 'i') };
    }

    Recipe.find(filter)
        .skip((page - 1) * limit)
        .limit(limit)
        .then(recipes =>{
            Recipe.countDocuments({ userId: userId}, (error , count) =>{
                if (error) {
                    return res.status(500).json({ error });
                }
                res.status(200).json({recipes, hasMore: page * limit < count});
            })
        })
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

// mise a jour du liked d'une recette en fonction de son id que si l'utilisateur connecté est le propriétaire de la recette a true ou false

exports.updateLikeRecipe = (req, res, next) => {
    const userId = req.body.userId;
    Recipe.updateOne({ _id: req.params.id, userId: userId }, { liked: req.body.liked })
        .then(() => res.status(200).json({ message: 'like mis à jour!' }))
        .catch(error => res.status(400).json({ error }));
}

// mise a jour du bookmarked d'une recette en fonction de son id que si l'utilisateur connecté est le propriétaire de la recette a true ou false

exports.updateBookmarkRecipe = (req, res, next) => {
    const userId = req.body.userId;
    Recipe.updateOne({ _id: req.params.id, userId: userId }, { bookmarked: req.body.bookmarked })
        .then(() => res.status(200).json({ message: 'bookmark mis à jour!' }))
        .catch(error => res.status(400).json({ error }));
}

// récupération de toute les recettes qui ont un bookmarked a true en fonction de l'utilisateur connecté

exports.getAllBookmarkedRecipes = (req, res, next) => {
    const userId = req.body.userId;
    Recipe.find({ userId: userId, bookmarked: true })
        .then(recipes => res.status(200).json(recipes))
        .catch(error => res.status(400).json({ error }));
}


