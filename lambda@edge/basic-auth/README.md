# Lambda@Edge Function
## Basic Auth

Provides Basic Authentication to website. Usernames and passwords are stored with the Lambda function in **[credentials.json](credentials.json)**. See file for format.

Create **Lambda@Edge** function:

- Function Name: `cloudfront-basic-auth`
- Description: `Basic Authentication`
- Runtime: `Node.js`
- Execution Role: **Use existing role** `cloudfront-lambda@edge-role`

Add the code from **[basic-auth.js](basic-auth.js)** and deploy.

Publish version and add a **CloudFront** trigger:

- Distribution: select the distribution ID
- Event Type: `Viewer Request`
- Cache Behavior: `Default (*)`
