# CloudFront Function
## Accept-Language

Redirects root path to `/fr/` if `Accept-Language` starts with `fr`. Otherwise it redirects to `/en/`. You can modify the function for your site’s languages.

Create **CloudFront** function:

- Function Name: `accept-language`
- Comment: `Redirect to language`
- Source Code: [index.js](index.js)

Publish then associate with one or more **CloudFront** distributions:

- Distribution: select the distribution ID
- Event Type: `Viewer Request`
- Cache Behavior: `/`
