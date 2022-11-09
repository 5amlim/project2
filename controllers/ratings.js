const Recipe = require('../models/recipe');

module.exports = {
    create,
    delete: deleteRating,
}

//! recipeId
function create(req, res) {
    Recipe.findById(req.params.id, function(err, recipe){
        console.log('👾', req.params.id)
        req.body.user = req.user._id
        req.body.name = req.user.name
        req.body.avatar = req.user.avatar
        recipe.ratings.push(req.body);
        recipe.save(function(err) {
            res.redirect(`/recipes/${recipe._id}`)
        })
    })
}

//! ratingId
function deleteRating(req, res, next){
    Recipe.findOne({
        "ratings._id": req.params.id,
        "ratings.user": req.user.id
    })
    .then(function(recipe){
        console.log('🥵', req.params.id)
        if (!recipe) return res.redirect('/recipes/${recipe._id}');
        recipe.ratings.remove(req.params.id);
        recipe.save()
        .then(function() {
            res.redirect(`/recipes/${recipe._id}`)
        })
        .catch(function (err) {
            return next(err);
          });
    })
}