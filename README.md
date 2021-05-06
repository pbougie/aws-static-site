# Static Websites with AWS S3 + CloudFront + Lambda@Edge

This article describes the installation and configuration of a static website on [Amazon Web Services](https://aws.amazon.com/). Includes redirection of `HTTP` to `HTTPS`, redirection of `www` sub-domain to the apex domain, redirects listed in a `json` file, updated security headers, basic authentication, custom error page, etc.

## [Amazon Route 53](https://aws.amazon.com/route53/)

Create a zone file for your domain if it doesn't exist. We will refer to the domain name as `domain.tld` throughout this document. Make sure to replace all mentions with your actual domain name. You will create `A` records later that will link your domain names to a [CloudFront](https://aws.amazon.com/cloudfront/) distribution.

Don't forget to point your domain's **nameservers** to AWS. See the `NS` record in Route 53 for the nameservers to use with your registrar.

## [AWS Certificate Manager](https://aws.amazon.com/certificate-manager/)

Request a public certificate for your domain. Add the following domain names:

- `domain.tld`
- `*.domain.tld`

## [Amazon S3](https://aws.amazon.com/s3/)

Create a new Amazon S3 bucket named `domain.tld`. Copy your website files to the S3 bucket. We will not be using the [Amazon S3 static website](https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html) feature. Keep the bucket private. CloudFront will add a bucket policy later for secure access using [Origin Access Identity](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html). You can enable [server-side encryption (SSE)](https://docs.aws.amazon.com/AmazonS3/latest/dev/serv-side-encryption.html) if you want.

## [AWS CloudFront](https://aws.amazon.com/cloudfront/)

Create a new web distribution with the following settings:

- Origin Domain Name: select `domain.tld.s3.amazonaws.com` from list
- Origin ID: `S3-domain.tld`
- Restrict Bucket Access: `Yes`
- Origin Access Identity: `Create a New Identity`
- Comment: `OAI-domain.tld`
- Grant Read Permissions on Bucket: `Yes, Update Bucket Policy`
- Viewer Protocol Policy: `Redirect HTTP to HTTPS`
- Compress Objects Automatically: `Yes`
- Lambda Function Associations: will be added later through Lambda@Edge
- Alternate Domain Names (CNAMEs): `domain.tld` and `www.domain.tld`
- SSL Certificate: select custom SSL certificate for `domain.tld`

Leave all other settings with their defaults.
Create the distribution.

### Error Pages (optional)

Create a custom error response with the following settings:

- HTTP Error Code: `403: Forbidden`
- Customize Error Response: `Yes`
- Response Page Path: `/404.html` (rename for your error page)
- HTTP Response Code: `404: Not Found`

The reason the selected HTTP error code is `403` is because we are accessing S3 using the REST API which returns a `Forbidden` error instead of `Not Found`.

## [AWS Identity and Access Management (IAM)](https://aws.amazon.com/iam/)

Create an IAM Role for executing your Lambda@Edge functions. Name your role `cloudfront-lambda@edge-role`. Attach policies `AWSLambdaEdgeExecutionRole` and `AmazonS3ReadOnlyAccess`. Edit the trust relationship and add [this policy](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-edge-permissions.html#lambda-edge-permissions-function-execution). See [documentation](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-edge-permissions.html) for more information.

## [AWS CloudFront Functions](https://docs.aws.amazon.com/console/cloudfront/functions/) + [AWS Lambda@Edge](https://aws.amazon.com/lambda/edge/)

Install a combination of CloudFront Functions and Lambda@Edge Functions for each static site as per your needs:

Function|Function Type|Event Type|Cache Behavior
---|---|---|---
[Accept-Language](cloudfront/accept-language)|CloudFront|Viewer Request|/
[Basic Auth](lambda@edge/basic-auth)|Lambda@Edge|Viewer Request|Default (*)
[Directory Index](lambda@edge/directory-index)|Lambda@Edge|Origin Request|Default (*)
[Redirect Alternate](cloudfront/redirect-alternate)|CloudFront|Viewer Request|Default (*)
[Redirect www to Apex](cloudfront/redirect-www-to-apex)|CloudFront|Viewer Request|Default (*)
[Redirects](lambda@edge/redirects)|Lambda@Edge|Origin Response|Default (*)
[Security Headers](cloudfront/security-headers)|CloudFront|Viewer Response|Default (*)

You can only use a CloudFront event once for each cache behavior so you may need to use Lambda@Edge functions to get around the limitation. **Directory Index** could be a CloudFront function but the **Viewer Request** event type is used for other purposes.

## [Amazon Route 53](https://aws.amazon.com/route53/) (continued)

Create two new simple records:

1. `domain.tld`
    - Record name: _leave empty_
    - Route traffic to: select **Alias to CloudFront distribution** and then your distribution
    - Record type: `A`
1. `www.domain.tld`
    - Record name: `www`
    - Route traffic to: select **Alias to CloudFront distribution** and then your distribution
    - Record type: `A`

## [AWS Command Line Interface (CLI)](https://aws.amazon.com/cli/)

A few commands to automate the deployment of your static websites.

### Deploy to Amazon S3

Copy files to Amazon S3 bucket.

    aws s3 sync <folder>/ s3://<domain.tld> --delete

### Cache Invalidation in AWS CloudFront

Remove objects from CloudFront edge caches.

    aws cloudfront create-invalidation --distribution-id <id> --paths '/*'

---
© [Patrick Bougie](https://patrickbougie.com/)
