# AWS Static Site
## CloudFront Function
### Redirect `www` to Apex

Redirects `www.domain.tld` to `domain.tld`.

Create a new function:

- Function name: `cloudfront-www-to-apex`
- Runtime: `Node.js`
- Execution role: **Use existing role** `cloudfront-lambda@edge-role`

Add the code from **[cloudfront-www-to-apex.js](cloudfront-www-to-apex.js)** and deploy.

Add a **CloudFront** trigger:

- Distribution: select the distribution ID
- CloudFront event: `Viewer Request`

Deploy to Lambda@Edge and link to CloudFront distribution.
