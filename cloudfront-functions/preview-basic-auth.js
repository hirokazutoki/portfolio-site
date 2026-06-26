// CloudFront Function: Basic Auth + index.html path rewriting for preview deployments
// Runtime: cloudfront-js-2.0 | Event type: viewer-request
//
// __ENCODED__ is replaced by GitHub Actions with base64("username:password")
// See .github/workflows/preview.yml

var EXPECTED = "Basic __ENCODED__";

function handler(event) {
    var request = event.request;
    var headers = request.headers;

    // Basic Auth check
    if (!headers.authorization || headers.authorization.value !== EXPECTED) {
        return {
            statusCode: 401,
            statusDescription: "Unauthorized",
            headers: {
                "www-authenticate": { value: 'Basic realm="Preview"' }
            }
        };
    }

    // Rewrite directory requests to serve index.html
    // e.g. /feature/branch-name/     -> /feature/branch-name/index.html
    //      /feature/branch-name/en   -> /feature/branch-name/en/index.html
    var uri = request.uri;
    var lastSegment = uri.split('/').pop();
    if (uri.endsWith('/')) {
        request.uri = uri + 'index.html';
    } else if (!lastSegment.includes('.')) {
        request.uri = uri + '/index.html';
    }

    return request;
}
