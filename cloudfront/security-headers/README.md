# AWS Static Site
## CloudFront Function
### Security Headers

Adds various security headers to the HTTP response.

Create a new function:

- Function name: `cloudfront-security-headers`
- Runtime: `Node.js`
- Execution role: **Use existing role** `cloudfront-lambda@edge-role`

Add the code from **[cloudfront-security-headers.js](cloudfront-security-headers.js)** and deploy.

Add a **CloudFront** trigger:

- Distribution: select the distribution ID
- CloudFront event: `Viewer Response`

Deploy to Lambda@Edge and link to CloudFront distribution.
