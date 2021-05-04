# AWS Static Site
## Lambda@Edge Function
### Redirects

Redirects RegEx paths listed in **[redirects.json](redirects.json)** that is hosted in the root of a website on S3. See file for format.

Create a new function:

- Function name: `cloudfront-redirects`
- Runtime: `Node.js`
- Execution role: **Use existing role** `cloudfront-lambda@edge-role`

Add the code from **[cloudfront-redirects.js](cloudfront-redirects.js)** and deploy.

Add a **CloudFront** trigger:

- Distribution: select the distribution ID
- CloudFront event: `Origin Response`

Deploy to Lambda@Edge and link to CloudFront distribution.
