# AWS Static Site
## Lambda@Edge Function
### Dir Index

For URI paths that don't have an extension: (1) adds a trailing slash if missing; (2) adds `index.html`.

Create a new function:

- Function name: `cloudfront-dir-index`
- Runtime: `Node.js`
- Execution role: **Use an existing role** : `cloudfront-lambda@edge-role`

Add the code from **[cloudfront-dir-index.js](cloudfront-dir-index.js)** and deploy.

Add a **CloudFront** trigger:

- Distribution: select the distribution ID
- CloudFront event: `Origin Request`

Deploy to Lambda@Edge and link to CloudFront distribution.
