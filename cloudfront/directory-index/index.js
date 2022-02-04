// Function Type: CloudFront Function
// Function Name: directory-index
// CloudFront Event: Viewer Request

function handler(event) {

  var request = event.request;
  var uri = request.uri;

  // Add trailing slash if directory and slash missing
  if (!uri.includes('.') && !uri.endsWith('/')) {
    return {
      statusCode: 301,
      statusDescription: 'Moved Permanently',
      headers: {
        location: { value: uri + '/' }
      }
    };
  }

  // Add index.html if URI ends with a slash
  request.uri = uri.replace(/\/$/, '\/index.html');

  return request;

}
