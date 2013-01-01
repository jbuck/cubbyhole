var uuid = require("node-uuid"),
    crypto = require("crypto");

function createS3Policy(s3config) {
  var filenamePrefix = uuid.v4();

  var s3Policy = {
    "expiration": new Date(Date.now() + 1000 * 60 * 60).toISOString(),
    "conditions": [
      {"bucket": s3config.bucket},
      ["starts-with", "$key", filenamePrefix],
      ["starts-with", "$Content-Type", s3config.defaultContentType],
      {"acl": "public-read"},
      ["content-length-range", s3config.contentLengthRangeMin, s3config.contentLengthRangeMax]
    ]
  };

  var policyJSONString = JSON.stringify(s3Policy);
  var policyBase64 = new Buffer(policyJSONString).toString('base64');

  var s3Credentials = {
    policyBase64: policyBase64,
    signature: crypto.createHmac('sha1', s3config.secret).update(policyBase64).digest('base64'),
    awsKey: s3config.key,
    filenamePrefix: filenamePrefix,
    bucket: s3config.bucket,
    policy: s3Policy
  };

  return s3Credentials;
}

module.exports = {
  create: createS3Policy
}
