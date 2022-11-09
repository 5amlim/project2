var express = require('express');
var router = express.Router();
var passport = require("passport");

const isLoggedIn = require("../config/auth");
const ratingsCtrl = require('../controllers/ratings')

router.post('/recipes/:id/ratings', isLoggedIn, ratingsCtrl.create)
router.delete('/ratings/:id', isLoggedIn, ratingsCtrl.delete);


module.exports = router;