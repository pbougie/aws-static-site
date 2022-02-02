// Function Type: Lambda@Edge Function
// Function Name: cloudfront-form
// CloudFront Event: Origin Request
// Include Body: Yes

const aws = require('aws-sdk');
const querystring = require('querystring');

async function fetchConfig(request) {
  const s3 = new aws.S3({ region: request.origin.s3.region });
  const response = await s3.getObject({
    Bucket: request.origin.s3.domainName.replace('.s3.amazonaws.com', ''),
    Key: request.uri.substring(1) + 'config.json'
  }, function (error, data) {
    if (error) {
      console.error('fetchConfig error: ' + error);
    }
  }).promise();

  return JSON.parse(response.Body.toString());
}

async function saveForm(request, config) {
  const date = new Date();
  const datetime = date.toISOString();

  const body = Buffer.from(request.body.data, 'base64').toString();
  const params = {
    datetime: datetime,
    ...querystring.parse(body)
  };

  const s3 = new aws.S3({ region: config.region });
  await s3.putObject({
    Body: JSON.stringify(params, null, 2),
    Bucket: config.bucket,
    ContentType: 'application/json',
    Key: config['key-prefix'] + datetime + '.json'
  }, function (error, data) {
    if (error) {
      console.error('putForm error: ' + error);
    }
  }).promise();

  return params;
}

exports.handler = async (event) => {

  const request = event.Records[0].cf.request;

  if (request.method === 'POST') {
    const config = await fetchConfig(request);
    console.info('Config: ' + JSON.stringify(config));

    const form = await saveForm(request, config);
    console.info('Form: ' + JSON.stringify(form));

    return {
      status: '303',
      statusDescription: 'See Other',
      headers: {
        location: [{
          key: 'Location',
          value: config['success-url']
        }]
      }
    };
  }

  return request;

};
