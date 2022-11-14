var express = require('express');
var router = express.Router();
var passport = require("passport");

const isLoggedIn = require("../config/auth");
const ratingsCtrl = require('../controllers/ratings')

router.post('/recipes/:id/ratings', isLoggedIn, ratingsCtrl.create)
router.delete('/ratings/:id', isLoggedIn, ratingsCtrl.delete);
router.get('/recipes/:recipeId/ratings/:ratingId/edit', isLoggedIn, ratingsCtrl.edit)
router.put('/recipes/:recipeId/ratings/:ratingId', isLoggedIn, ratingsCtrl.update)


module.exports = router;