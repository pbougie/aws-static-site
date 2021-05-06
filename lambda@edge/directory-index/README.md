# Lambda@Edge Function
## Directory Index

For URI paths that don't have an extension: (1) add a trailing `/` if missing and redirect; (2) add `index.html` and retrieve origin object.

Create Lambda@Edge function:

- Function Name: `cloudfront-directory-index`
- Description: `Directory Index`
- Runtime: `Node.js`
- Execution Role: **Use existing role** `cloudfront-lambda@edge-role`

Add the code from **[directory-index.js](directory-index.js)** and deploy.

Add a **CloudFront** trigger:

- Distribution: select the distribution ID
- Event Type: `Origin Request`
- Cache Behavior: `Default (*)`
