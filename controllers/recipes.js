const Recipe = require('../models/recipe');

module.exports = {
    index,
    create,
    new: newRecipe,
    show,
}

function index(req, res) {
    Recipe.find({}, function (err, recipes) {
        res.render('recipes/index', {title: 'Discover Recipes', recipes});
    })
}

function create(req, res) {
    const recipe = new Recipe(req.body);
    recipe.save(function(err) {
        if(err) return res.redirect ('/recipes/new');
        console.log(recipe)
        res.redirect('/recipes')
    })
}

function newRecipe(req, res) {
    res.render("recipes/new", {title:'Add Recipe'});
}

function show(req, res) {
    Recipe.findById(req.params.id, function (err, recipe) {
       
    res.render("recipes/show", {title:'Full Recipe', recipe});
    });
}