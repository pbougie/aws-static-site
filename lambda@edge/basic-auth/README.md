# AWS Static Site
## Lambda@Edge Function
### Basic Auth

Provides Basic Authentication to website. Usernames and passwords are stored with the Lambda function in **[credentials.json](credentials.json)**. See file for format.

Create a new function:

- Function name: `cloudfront-basic-auth`
- Runtime: `Node.js`
- Execution role: **Use existing role** `cloudfront-lambda@edge-role`

Add the code from **[cloudfront-basic-auth.js](cloudfront-basic-auth.js)** and deploy.

Add a **CloudFront** trigger:

- Distribution: select the distribution ID
- CloudFront event: `Viewer Request`

Deploy to Lambda@Edge and link to CloudFront distribution.
