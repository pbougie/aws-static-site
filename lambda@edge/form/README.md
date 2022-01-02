# Lambda@Edge Function
## CloudFront Form

Save form data to S3 as JSON.

Update **CloudFront** distribution with a new behavior:

- Path Pattern: `<path>/`

Save form configuration with source code in `<path>/config.json`.
See [config.json](config.json) for format.

Create **Lambda@Edge** function:

- Function Name: `cloudfront-form`
- Description: `Save form to S3 as JSON`
- Runtime: `Node.js`
- Execution Role: **Use existing role** `cloudfront-lambda@edge-role`

Add the code from **[form.js](form.js)** and deploy.

Publish version and add a **CloudFront** trigger:

- Distribution: select the distribution ID
- Event Type: `Origin Request`
- Cache Behavior: `<path>/`
- Include Body: _yes_
