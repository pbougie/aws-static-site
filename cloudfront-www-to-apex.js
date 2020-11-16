// Lambda@Edge
// Function name: cloudfront-www-to-apex
// CloudFront event: Viewer Request

exports.handler = async (event) => {

  const request = event.Records[0].cf.request;
  const hostname = request.headers.host[0].value;

  if (hostname.includes('www.')) {
    return {
      status: '301',
      statusDescription: 'Moved Permanently',
      headers: {
        location: [{
          key: 'Location',
          value: 'https://' + hostname.replace('www.', '') + request.uri
        }]
      }
    };
  }

  return request;

};
