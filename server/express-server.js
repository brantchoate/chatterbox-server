var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var payload = {results : [{
      'username': 'Wizard',
      'text': 'invoke!',
    }]
}

app.use(bodyParser.json());

app.get('/classes/messages', function(req, res) {
  res.status(200).set(defaultCorsHeaders).send(payload);
});

app.post('/classes/messages', function(req, res) {
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
