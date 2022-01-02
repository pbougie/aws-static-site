# CloudFront Function
## Security Headers

Adds various security headers to the HTTP response.

Create **CloudFront** function:

- Function Name: `security-headers`
- Comment: `HTTP security headers`
- Source Code: [security-headers.js](security-headers.js)

Publish then associate with one or more **CloudFront** distributions:

- Distribution: select the distribution ID
- Event Type: `Viewer Response`
- Cache Behavior: `Default (*)`
