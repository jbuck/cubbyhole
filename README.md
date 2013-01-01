# cubbyhole

A place to store your stuff.

## Installation

1. Install __node__ and __npm__.
2. Clone the repo: `git clone git@github.com:jbuck/cubbyhole.git`.
3. Run `npm install`.

## Usage

`NODE_ENV=<configtype> node server.js`

e.g. `NODE_ENV=production node server.js`

## Config
```
{
  port: Server port to host the app.
  showUrl: Show a url to the user once uploading has finished.
  s3: {
    bucket: Name of your S3 bucket.
    key: Auth key for s3.
    secret: Auth secret for S3.
    contentLengthRangeMin: Minimum file size to accept (in bytes).
    contentLengthRangeMax: Maximum file size to accept (in bytes).
    defaultContentType: 'Content-Type' header to use. An empty string accepts all content types.
  }
}
```

## License (MIT)
Copyright (C) 2013 Bobby Richter, John Buckley

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
