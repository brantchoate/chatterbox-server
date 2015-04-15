var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/expressDB');
var app = express();
var payload = {results : [] };

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('YAY');
});

var messageSchema = mongoose.Schema({
    username: String,
    text: String
});

var Message = mongoose.model('Message', messageSchema);

Message.find(function (err, messages) {
  if (err) return console.error(err);
  messages.forEach(function(message) {
    payload.results.push(message);
  });

});


//////////////////////////////////////////////////////////////////////
app.use(bodyParser.json());

app.get('/classes/messages', function(req, res) {
  res.status(200).set(defaultCorsHeaders).send(payload);
});

app.post('/classes/messages', function(req, res) {
  var message = new Message(req.body);
  message.save();
  payload.results.push(req.body);
  res.status(200).set(defaultCorsHeaders).json(req.body);
});

app.options('/classes/messages', function(req, res) {
  res.status(200).set(defaultCorsHeaders).end();
});

var server = app.listen(3000, '127.0.0.1');
var defaultCorsHeaders = {
  "Allow": "GET,POST,OPTIONS",
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};
