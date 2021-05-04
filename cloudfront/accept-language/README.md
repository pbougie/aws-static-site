# AWS Static Site
## CloudFront Function
### Accept-Language

Redirects root path to `/fr/` if `Accept-Language` starts with `fr`. Otherwise it redirects to `/en/`.

Create a new function:

- Function name: `cloudfront-accept-language`
- Runtime: `Node.js`
- Execution role: **Use existing role** `cloudfront-lambda@edge-role`

Add the code from **[cloudfront-accept-language.js](cloudfront-accept-language.js)** and deploy.

Add a **CloudFront** trigger:

- Distribution: select the distribution ID
- CloudFront event: `Viewer Request`

Deploy to Lambda@Edge and link to CloudFront distribution. You might have to modify the function for your site’s languages. You can create an additional CloudFront behavior with path pattern `/` to attach this function if you have another `Viewer Request` event.
