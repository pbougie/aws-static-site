# Lambda@Edge Function
## CloudFront Form

Save form data to S3 as JSON.

1. Create a form that submits to `<path>`.

1. Create form submission success page.

1. Update **CloudFront** distribution with a new behavior:

    - Path Pattern: `<path>/` (form submission and JSON config path)
    - Origin: Default S3 origin
    - Viewer Protocol Policy: Redirect HTTP to HTTPS
    - Allowed HTTP Methods: GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE
    - Cache Policy: Caching disabled

1. Save form configuration with source code in `<path>/config.json`.

    ```
    {
      "region": "ca-central-1",
      "bucket": "<s3-bucket-name>",
      "key-prefix": "<key-prefix-to-differentiate-forms>",
      "success-url": "<success-url-for-redirection>"
    }
    ```

1. Create **Lambda@Edge** function:

    - Function Name: `cloudfront-form`
    - Description: `Save form to S3 as JSON`
    - Runtime: `Node.js`
    - Execution Role: **Use existing role** `cloudfront-lambda@edge-role`

1. Add the code from **[index.js](index.js)** and deploy.

1. Publish version and add a **CloudFront** trigger:

    - Distribution: select the distribution ID
    - Event Type: `Origin Request`
    - Cache Behavior: `<path>/`
    - Include Body: _yes_
