const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

const userRoutes = require('./routes/user');
const recipeRoutes = require('./routes/recipe');

const bddMongoose = `mongodb+srv://${process.env.BDD_USER}:${process.env.BDD_PASSWORD}@cluster0.p8ezh79.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(bddMongoose, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
 

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(express.json());

app.use('/api/auth', userRoutes);
app.use('/api/recipes', recipeRoutes);


module.exports = app;