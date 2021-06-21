var express = require('express');
var router = express.Router();
var api = require('marvel-api');
require('dotenv').config();

const marvel = api.createClient({
  publicKey: process.env.MARVEL_PUBLIC_KEY,
  privateKey: process.env.MARVEL_PRIVATE_KEY
});

/* GET home page. */
router.get('/', function(req, res, next) {
  let charactersNameArray = new Array(20);
  // Store positions in array to be included in dropdown selection
  const standardPositions =["Leader", "Attacker", "Defender", "Support"] ;
  const optionalPositions = ["Select position", "Attacker", "Defender", "Support"];

  marvel.characters.findAll().then(function(body){
    const json = body.data;

    /* Used to store names of all heroes in array that can be used for drop down list  */
    for (var i = 0; i < body.data.length; i++){
      charactersNameArray[i] = body.data[i].name;
    }

    // Add default dropdown selection option for hero selection
    charactersNameArray.unshift("Select your player");

    res.render('index', { json, charactersNameArray, standardPositions, optionalPositions });
  })
  .fail(console.error)
  .done();
});

module.exports = router;
