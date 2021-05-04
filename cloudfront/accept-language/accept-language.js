// Lambda@Edge
// Function name: cloudfront-accept-language
// CloudFront event: Viewer Request

exports.handler = async (event) => {

  const request = event.Records[0].cf.request;
  const headers = request.headers;
  let language = 'en'; // Default language

  if (request.uri == '/') {

    if (typeof headers['accept-language'] !== 'undefined') {
      const supportedLanguages = headers['accept-language'][0].value;
      if (supportedLanguages.startsWith('fr')) {
        language = 'fr';
      }
      console.log('Supported Languages: ', supportedLanguages);
      console.log('Language: ', language);
    }

    return {
      status: '302',
      statusDescription: 'Found',
      headers: {
        location: [{
          key: 'Location',
          value: '/' + language + '/'
        }]
      }
    };

  } else {

    return request;

  }

};
