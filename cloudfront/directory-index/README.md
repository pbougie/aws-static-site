# CloudFront Function
## Directory Index

For URI paths that don't have an extension: (1) add a trailing `/` if missing and redirect; (2) add `index.html` and retrieve origin object.

Create **CloudFront** function:

- Function Name: `directory-index`
- Comment: `Directory Index`
- Source Code: [index.js](index.js)

Publish then associate with one or more **CloudFront** distributions:

- Distribution: select the distribution ID
- Event Type: `Viewer Request`
- Cache Behavior: `Default (*)`
