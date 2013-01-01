var express = require("express"),
    app = express(),
    signer = require("./lib/s3signer"),
    config = require('config');

app.use(express.static(__dirname + "/public"));

app.get('/request', function(req, res) {
  var s3PolicyPackage = signer.create(config.s3)

  // Do we want to show the url to the user when uploading is done?
  s3PolicyPackage.showUrl = config.showUrl;

  res.json(s3PolicyPackage);
});

app.listen(config.port);
