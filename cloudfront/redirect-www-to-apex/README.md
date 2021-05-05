# CloudFront Function
## Redirect `www` to Apex

Redirects `www.domain.tld` to `domain.tld`.

Create CloudFront function:

- Function Name: `redirect-www-to-apex`
- Comment: `Redirect www to apex domain`
- Source Code: [redirect-www-to-apex.js](redirect-www-to-apex.js)

Publish then associate with one or more CloudFront distributions:

- Distribution: select the distribution ID
- Event Type: `Viewer Request`
- Cache Behavior: `Default (*)`
