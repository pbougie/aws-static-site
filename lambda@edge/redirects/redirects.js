// Function Type: Lambda@Edge Function
// Function Name: cloudfront-redirects
// CloudFront Event: Origin Response

const aws = require('aws-sdk');

async function fetchRedirects(s3Origin) {
  const s3 = new aws.S3({ region: s3Origin.region });
  const s3Params = {
    Bucket: s3Origin.domainName.replace('.s3.amazonaws.com', ''),
    Key: 'redirects.json'
  };

  const response = await s3.getObject(s3Params, function (err, data) {
    if (err) {
      console.error(err);
    }
  }).promise();

  return JSON.parse(response.Body.toString()).map(
    ({ source, destination }) => ({
      source: new RegExp(source),
      destination
    })
  );
}

exports.handler = async (event) => {
  const { request, response } = event.Records[0].cf;

  try {
    const redirects = await fetchRedirects(request.origin.s3);

    for (const { source, destination } of redirects) {
      // Strip index.html because added in another Lambda@Edge function
      let uri = request.uri.replace('index.html', '');

      if (source.test(uri)) {
        response.status = '301';
        response.statusDescription = 'Moved Permanently';
        response.headers['location'] = [{ value: destination }];

        return response;
      }
    }

    return response;
  } catch (_error) {
    return response;
  }
};
