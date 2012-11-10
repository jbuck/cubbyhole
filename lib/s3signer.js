var uuid = require("node-uuid"),
    crypto = require("crypto");

var key = process.env.AWS_KEY,
    secret = process.env.AWS_SECRET;

function createS3Policy() {
  var s3Policy = {
    "expiration": new Date(Date.now() + 1000 * 60 * 60).toISOString(),
    "conditions": [
      {"bucket": "org.mozillafestival.cubby"},
      ["starts-with", "$key", uuid.v4()],
      ["starts-with", "$Content-Type", ""],
      {"acl": "public-read"},
      ["content-length-range", 0, 104857600] // 0-100MB, in bytes
    ]
  };

  var s3Credentials = {
    policyBase64: new Buffer(JSON.stringify(s3Policy)).toString("base64"),
    signature: crypto.createHmac("sha1", secret).update(JSON.stringify(s3Policy)).digest("base64"),
    key: key,
    policy: s3Policy
  };

  return s3Credentials;
}

module.exports = {
  create: createS3Policy
}
