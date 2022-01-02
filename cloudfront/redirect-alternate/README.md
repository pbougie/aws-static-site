# CloudFront Function
## Redirect Alternate

Redirects to an alternate domain.

Create **CloudFront** function:

- Function Name: `redirect-alternate`
- Comment: `Redirect to an alternate domain`
- Source Code: [redirect-alternate.js](redirect-alternate.js)

Publish then associate with one or more **CloudFront** distributions:

- Distribution: select the distribution ID
- Event Type: `Viewer Request`
- Cache Behavior: `Default (*)`
