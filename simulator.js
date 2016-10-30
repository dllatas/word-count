// load & init modules
var _           = require('lodash');
var config      = require('./config');

// returns a random number between two values
function _rngValue(min, max) {
  return Math.floor((Math.random() * max) + min);
}

// returns a list of values between two values
function _rngRange(min, max, count) {
  var list = [];

  // make sure the count is not higher then the max
  if (count > max) {
    count = max;
  }

  // fill the list with random numbers until its full
  while(list.length <= count) {
    var value = _rngValue(min, max);
    if (list.indexOf(value) == -1) {
      list.push(value);
    }
  }

  return list;
}

// returns a randomized batch of words and counts
function _batch(dictionary) {
  // make sure we have a dictionary
  if (!dictionary) {
    console.log("ERROR: empty dictionary");
    return [];
  }

  // determine the batch size
  var batchSize = _rngValue(config.app.batchSize[0], config.app.batchSize[1]);

  // determine which unique words to use
  var wordKeyList = _rngRange(0, dictionary.length, batchSize);

  // build the batch of words
  var batch = [];
  _.forEach(wordKeyList, function(wordKey) {
    var result = {};

    // create the object with the word & determine a count for it
    result[dictionary[wordKey]] = _rngValue(config.app.wordCount[0], config.app.wordCount[1]);
    batch.push(result);
  });

  console.log("Broadcasting %d words", batch.length);
  return batch;
}

module.exports = {
  batch: _batch
};
