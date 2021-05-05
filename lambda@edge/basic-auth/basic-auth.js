// Function Type: Lambda@Edge Function
// Function Name: cloudfront-basic-auth
// CloudFront Event: Viewer Request

exports.handler = async (event) => {

  const request = event.Records[0].cf.request;
  const headers = request.headers;
  const hostname = headers.host[0].value;

  const credentials = require('./credentials.json');

  const username = credentials[hostname].username;
  const password = credentials[hostname].password;

  const auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');

  if (typeof headers.authorization == 'undefined' || headers.authorization[0].value != auth) {
    return {
      status: '401',
      statusDescription: 'Unauthorized',
      body: 'Unauthorized',
      headers: {
        'www-authenticate': [{
          key: 'WWW-Authenticate',
          value: 'Basic'
        }]
      }
    };
  }

  return request;

};
