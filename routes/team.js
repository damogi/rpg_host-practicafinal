//Dependencies & Modules
var express = require('express');
var router = express.Router();
var database = require('./../database.js');
var bodyParser = require('body-parser');

//## Team Services [/team/{userId}]
//### Get Team [GET]
router.get('/:playerId', function(request, response){
  var playerId=request.params.playerId;
  var query='SELECT "character_id_1", "character_id_2", "character_id_3" FROM "team" WHERE "player_id" IN ({0});';
  query = query.replace('{0}', playerId);

  try {
    database.query(query, function(result){
      var responseJson={
        "character1": result[0].character_id_1,
        "character2": result[0].character_id_2,
        "character3": result[0].character_id_3
      }
      response.send(responseJson)
    })
  } catch (e) {
      console.error(error);
  }
});

//### Post Team [POST]
router.post('/:userId', function(request, response){
  var userId = request.params.userId;
  //Body elements
  var character1 = request.body.character1;
  var character2 = request.body.character2;
  var character3 = request.body.character3;

  var query = 'UPDATE "team" SET character_id_1 = {0}, character_id_2 = {1}, character_id_3 = {2} WHERE player_id IN ({3})';

  query = query.replace('{0}', character1);
  query = query.replace('{1}', character2);
  query = query.replace('{2}', character3);
  query = query.replace('{3}', userId);

  try {
    database.query(query, function(result){
      response.send('Team Saved!');
    })
  } catch (error) {
      console.error(error);
  }
})
module.exports = router;
