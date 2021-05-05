// Function Type: CloudFront Function
// Function Name: accept-language
// CloudFront Event: Viewer Request

function handler(event) {

  var request = event.request;
  var uri = request.uri;
  var headers = request.headers;

  var language = 'en'; // Default language

  if (typeof headers['accept-language'] !== 'undefined') {
    var supportedLanguages = headers['accept-language'].value;
    if (supportedLanguages.startsWith('fr')) {
      language = 'fr';
    }
  }

  return {
    statusCode: 302,
    statusDescription: 'Found',
    headers: {
      location: { value: '/' + language + '/' }
    }
  };

}
