//Dependencies & Modules
var express = require('express');
var router = express.Router();

//# RPG API
router.get('/', function(request, response, next) {
  response.render('index', { title: 'Rpg Services!!' });
});

module.exports = router;
