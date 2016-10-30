// load & init modules
var _           = require('lodash');
var fs          = require('fs');

// loads a specified file and creates a dictionary of unique words from it
function _load(filename, callback) {
  // read & process the file
  fs.readFile(filename, 'utf8', function(error, data) {
    if (error) {
      console.error("Couldn't read file: %d", filename);
      process.exit(1);
    }

    // text split in to words
    var words = data.split(" ");

    // words are filtered & cleaned
    words = _.map(words, function(word) {
      word = word.toLowerCase();
      word = word.replace(/[^0-9a-z_\-]/gi, '');
      return word;
    });

    // make our list unique
    words = _.uniq(words);

    var wordCount = words.length || 0;
    console.error("Dictionary loaded with %d unique words", wordCount);

    // send dictionary to callback-function
    callback(words);
  });
}

module.exports = {
  load: _load
};
