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
    // Strip index.html because added in another function
    const uri = request.uri.replace('index.html', '');

    for (const { source, destination } of redirects) {
      if (source.test(uri)) {
        let new_destination;

        if (uri.match(source)) {
          new_destination = uri.replace(source, destination);
        } else {
          new_destination = destination;
        }

        response.status = '301';
        response.statusDescription = 'Moved Permanently';
        response.headers['location'] = [{ value: new_destination }];

        return response;
      }
    }

    return response;
  } catch (_error) {
    return response;
  }
};
