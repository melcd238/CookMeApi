const Ustensil = require('../models/ustensil');

// création d'un ustensil dans la base de données que si l'utilisateur est connecté

exports.createUstensil = (req, res, next) => {
    Ustensil.findOne({ name: req.body.name }, (error, existingUstensil)=> {
    if (error) {
        return res.status(500).json({ error });
    }
        if (existingUstensil) {
            return res.status(400).json({ error: 'Ustensil déjà existant' });
            }
        const ustensil = new Ustensil({
            name: req.body.name,
        });
        ustensil.save()
            .then(() => res.status(201).json({ message: 'Ustensil créé !' }))
            .catch(error => res.status(400).json({ error }));
    }
    )
}

// récupération de tous les ustensils de la base de données que si l'utilisateur est connecté

exports.getAllUstensils = (req, res, next) => {
    //const page =  parseInt(req.query.page) || 1;
    //const limit = parseInt(req.query.limit) || 20;
    
    Ustensil.find()
    //.skip((page - 1) * limit)
    //.limit(limit)
    .then(ustensils => res.status(200).json(ustensils))
    .catch(error => res.status(400).json({ error }));
}