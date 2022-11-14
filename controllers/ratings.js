const Recipe = require('../models/recipe');

module.exports = {
    create,
    delete: deleteRating,
    edit,
    update,
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

function edit(req, res) {
    Recipe.findOne({'ratings._id':req.params.ratingId})
    .then(function (recipe) {
        const rating = recipe.ratings.id(req.params.ratingId)
    res.render("ratings/edit", {title:'Edit Comment', rating, recipe});
    });
}

function update(req, res, next) {
    Recipe.findOne({'ratings._id': req.params.ratingId})
    .then(function(recipe){
        const rating = recipe.ratings.id(req.params.ratingId)
        console.log('🪲', recipe)
        console.log('🪲', req.body.content)
        console.log('🪲', req.body.rating)
        console.log('😈', rating.content)
        rating._id = req.params.ratingId
        rating.content = req.body.content
        rating.rating = req.body.rating
        rating.user = req.user
        rating.name = req.user.name
        console.log('👾', rating)
        rating.save()
        recipe.save()
    })
    .then(function(){res.redirect(`/recipes/${req.params.recipeId}`);}
    )
    .catch(function (err) {
        return next(err);
      });
}