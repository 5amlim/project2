const Recipe = require('../models/recipe');
const User = require('../models/user');

module.exports = {
    index,
    create,
    new: newRecipe,
    show,
    viewAll,
    delete: deleteRecipe,
    edit,
    update
}

function index(req, res) {
    Recipe.find({}, function (err, recipes) {
        res.render('recipes/index', {title: 'Discover Recipes', recipes});
    })
}

function create(req, res) {
    const recipe = new Recipe(req.body);
    const userId = res.locals.user._id
    console.log('😀', recipe.name)
    recipe.user = userId
    recipe.userName = req.user.name
    recipe.save(function(err) {
        if(err) return res.redirect ('/recipes/new');
        console.log(recipe._id)
        res.redirect(`/recipes/${recipe._id}`)
    })
}

function newRecipe(req, res) {
    res.render("recipes/new", {title:'Add Recipe'});
}

function show(req, res) {
    Recipe.findById(req.params.recipeId, function (err, recipe) {
        console.log('🐝', req.params.recipeId)
    res.render("recipes/show", {title:'Full Recipe', recipe});
    });
}

function viewAll(req, res) {
    console.log('😈', req.params.userId)
        Recipe.find({user:req.params.userId}, function (err, recipe) {
            console.log('🎃', recipe)
    res.render("recipes/userRecipe", {title:'My Recipes', recipe
    });
})
}

function deleteRecipe(req, res, next){
    Recipe.findOne({
        "_id": req.params.id,
        "user": req.user.id
})
    .then(function(recipe){
        if (!recipe){
            return res.redirect(`/recipes`)
        }
        console.log('👹', req.params.id)
        recipe.remove(req.params.id)
    })
    .then(function(recipe){
        if(!recipe){
        console.log('😡', recipe),
        res.redirect(`/recipes/${req.user._id}/all`)
    }
})
    .catch(function (err) {
        return next(err);
      });
}

function edit(req, res) {
    Recipe.findById(req.params.recipeId, function (err, recipe) {
        console.log('🐝', req.params.recipeId)
    res.render("recipes/edit", {title:'Edit Recipe', recipe});
    });
}

function update(req, res, next) {
    Recipe.findOne({
        "_id": req.params.recipeId
    })
    .then (function(recipe){
        console.log('🪲', req.params.recipeId)
        console.log('🪲', recipe)
        console.log('🪲', req.body.name)
        recipe.name = req.body.name
        recipe.cuisineType = req.body.cuisineType
        recipe.user = req.body.user
        recipe.ingredients = req.body.ingredients
        recipe.instructions = req.body.instructions
        recipe.difficulty = req.body.difficulty
        recipe.user = req.user.id
        recipe.userName = req.user.name
        console.log('🪲', req.user.id)
        recipe.save()
    })
    .then (function(err, recipe){
        res.redirect(`/recipes/${req.params.recipeId}`)
    })
    .catch (function(err){
        return next(err)
    })
}

