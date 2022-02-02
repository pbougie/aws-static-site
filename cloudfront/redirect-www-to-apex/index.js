// Function Type: CloudFront Function
// Function Name: redirect-www-to-apex
// CloudFront Event: Viewer Request

function handler(event) {

  var request = event.request;
  var uri = request.uri;
  var host = request.headers.host.value;

  if (host.includes('www.')) {
    return {
      statusCode: 301,
      statusDescription: 'Moved Permanently',
      headers: {
        location: {
          value: 'https://' + host.replace('www.', '') + uri
        }
      }
    };
  }

  return request;

}
