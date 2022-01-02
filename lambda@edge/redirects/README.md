# Lambda@Edge Function
## Redirects

Redirects RegEx paths listed in **[redirects.json](redirects.json)** that is hosted in the root of a website on S3. See file for format.

Create **Lambda@Edge** function:

- Function Name: `cloudfront-redirects`
- Description: `Redirects`
- Runtime: `Node.js`
- Execution Role: **Use existing role** `cloudfront-lambda@edge-role`

Add the code from **[redirects.js](redirects.js)** and deploy.

Publish version and add a **CloudFront** trigger:

- Distribution: select the distribution ID
- Event Type: `Origin Response`
- Cache Behavior: `Default (*)`
