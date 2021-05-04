// Lambda@Edge
// Function name: cloudfront-security-headers
// CloudFront event: Viewer Response

// https://securityheaders.com/

exports.handler = async (event) => {

  const response = event.Records[0].cf.response;
  const headers = response.headers;

  // Content-Security-Policy
  headers['content-security-policy'] = [{
    value: "default-src https:; style-src 'unsafe-inline' https:;"
  }];

  // Permissions-Policy
  headers['permissions-policy'] = [{
    value: 'camera=(), geolocation=(), interest-cohort=(), microphone=(), payment=()'
  }];

  // Referrer-Policy
  headers['referrer-policy'] = [{
    value: 'strict-origin-when-cross-origin'
  }];

  // Strict-Transport-Security (HSTS)
  headers['strict-transport-security'] = [{
    value: 'max-age=63072000' // 2 years
  }];

  // X-Content-Type-Options
  headers['x-content-type-options'] = [{
    value: 'nosniff'
  }];

  // X-Frame-Options
  headers['x-frame-options'] = [{
    value: 'DENY'
  }];

  return response;

};
