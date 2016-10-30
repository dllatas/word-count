// load & init modules
var express     = require('express');
var app         = express();
var http        = require('http').Server(app);
var io          = require('socket.io')(http);
var config      = require('./config');
var dictionary  = require('./dictionary');
var simulator   = require('./simulator');

// load the dictionary
var words = [];
dictionary.load(config.app.filename,function(data){
  words = data;
});

// link / (web-root) to the /www folder
app.use('/', express.static('www'));

// link /static to the /node_modules folder (easy access to socket.io.js)
app.use('/static', express.static('node_modules'));

app.use('/client', express.static('client/bin'));

// force websocket connections
io.set('transports', ['websocket']);

// client notifications
io.on('connection', function (socket) {
  console.log("Client connected (current: %d)",io.engine.clientsCount);

  socket.on('disconnect', function() {
    console.log("Client disconnected (current: %d)",io.engine.clientsCount);
  });
});

// start listening on the configured port and start the broadcaster
http.listen(config.app.port, function() {
  console.log("Server listening on port %d (http & ws)",config.app.port);

  // calculate & verify interval time
  var broadcasterInterval = 5000;
  if (parseInt(config.app.interval) < 1) {
    console.log("Broadcasting interval value is invalid, using default value");
  } else {
    // value is okay, set it
    broadcasterInterval = parseInt(config.app.interval)*1000;
  }

  // start broadcaster
  console.log("Broadcasting words every %d seconds",(broadcasterInterval/1000));
  broadcaster = setInterval(_broadcastBatch, broadcasterInterval);
});

function _broadcastBatch() {
  // only broadcast words if we have connected clients
  if (typeof io.engine.clientsCount != 'number' || io.engine.clientsCount < 1) {
    // skip cycle
    return;
  }

  // broadcast a batch of words to all clients
  io.emit('words',simulator.batch(words));
}
