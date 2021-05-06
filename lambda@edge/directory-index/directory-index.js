// Function Type: Lambda@Edge Function
// Function Name: cloudfront-directory-index
// CloudFront Event: Origin Request

const path = require('path');

exports.handler = async (event) => {

  const request = event.Records[0].cf.request;
  const uri = request.uri;
  const parsedUri = path.parse(uri);

  // If URI is directory and no slash at end:
  // add trailing slash and redirect
  if (parsedUri.ext === '' && !uri.endsWith('/')) {
    return {
      status: '301',
      statusDescription: 'Moved Permanently',
      headers: {
        location: [{
          key: 'Location',
          value: uri + '/'
        }]
      }
    };
  }

  // If URI ends with a slash:
  // add index.html to retrieve object from origin
  request.uri = uri.replace(/\/$/, '\/index.html');

  return request;

};
