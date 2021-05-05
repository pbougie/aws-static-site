// Function Type: Lambda@Edge Function
// Function Name: cloudfront-directory-index
// CloudFront Event: Origin Request

exports.handler = async (event) => {

  const request = event.Records[0].cf.request;
  const uri = request.uri;
  const parsedURI = require('path').parse(uri);

  // Add trailing slash if missing
  if (parsedURI.ext === '' && !uri.endsWith('/')) {
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

  // Add index.html if URI ends with a slash
  request.uri = uri.replace(/\/$/, '\/index.html');

  return request;

};
