const Recipe = require('../models/recipe');
const User = require('../models/user');

module.exports = {
    index,
    create,
    new: newRecipe,
    show,
    viewAll,
    delete: deleteRecipe,
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
    User.findById(userId, function(err, user, next){
        console.log('🥳', user)
        user.recipes.push(recipe)
        user.save(function(err) {
            if(err) return res.redirect ('/recipes/new')
            console.log(user)
            recipe.user = userId
            recipe.save(function(err) {
                if(err) return res.redirect ('/recipes/new');
                console.log(recipe._id)
                res.redirect(`/recipes/${recipe._id}`)
            })
        })
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

function viewAll(req, res) {
    console.log('😈', req.params.id)
        Recipe.find({user:req.params.id}, function (err, recipe) {
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
        recipe.save()
    })
    .then(function(recipe){
        console.log('😡', recipe)
        res.redirect(`/recipes/${req.user._id}/all`)
    })
    .catch(function (err) {
        return next(err);
      });
}