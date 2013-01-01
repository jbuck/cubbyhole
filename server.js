var express = require("express"),
    app = express(),
    signer = require("./lib/s3signer"),
    config = require('config');

app.use(express.static(__dirname + "/public"));

app.get('/request', function(req, res) {
  res.json(signer.create(config.s3));
});

app.listen(config.port);
