var express = require('express');
var router = express.Router();

const isLoggedIn = require("../config/auth");
const recipesCtrl = require('../controllers/recipes')

router.get('/', recipesCtrl.index);
router.get('/new', recipesCtrl.new);
router.post('/', isLoggedIn, recipesCtrl.create);
router.get('/:recipeId', recipesCtrl.show);
router.get('/:userId/all', isLoggedIn, recipesCtrl.viewAll);
router.delete('/:id', isLoggedIn, recipesCtrl.delete);

module.exports = router;