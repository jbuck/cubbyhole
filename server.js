var express = require("express"),
    app = express(),
    signer = require("./lib/s3signer");

app.use(express.static(__dirname + "/public"));

app.get('/request', function(req, res) {
  res.json(signer.create());
});

app.listen(8080);
