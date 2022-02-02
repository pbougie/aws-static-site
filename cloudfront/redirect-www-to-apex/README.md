# CloudFront Function
## Redirect `www` to Apex

Redirects `www.domain.tld` to `domain.tld`.

Create **CloudFront** function:

- Function Name: `redirect-www-to-apex`
- Comment: `Redirect www to apex domain`
- Source Code: [index.js](index.js)

Publish then associate with one or more **CloudFront** distributions:

- Distribution: select the distribution ID
- Event Type: `Viewer Request`
- Cache Behavior: `Default (*)`
