// Function Type: CloudFront Function
// Function Name: redirect-alternate
// CloudFront Event: Viewer Request

function handler(event) {

  var request = event.request;
  var uri = request.uri;

  var alternate = 'https://example.com'; // Modify for your needs

  return {
    statusCode: 301,
    statusDescription: 'Moved Permanently',
    headers: {
      location: { value: alternate + uri }
    }
  };

}
