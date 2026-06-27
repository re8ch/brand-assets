const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Expose-Headers': 'ETag, Content-Length, Content-Type, Cache-Control',
};

function cacheControl(key) {
  if (/\.(html?|json|xml|txt|md)$/i.test(key)) return 'no-cache';
  if (/^(src|dist)\/re8ch-(navigator|footer)\.(js|css)$/i.test(key)) return 'public, max-age=0, must-revalidate';
  if (/^UI\/re8ch-product-system\/v1\/re8ch-product-system\.(js|css)$/i.test(key)) return 'public, max-age=0, must-revalidate';
  if (/^(SVG|PNG)\/logo\.(svg|png)$/i.test(key)) return 'public, max-age=0, must-revalidate';
  if (/^PRODUCTS\/[^/]+\/(SVG|PNG)\/icon(?:-[^/]+)?\.(svg|png)$/i.test(key)) return 'public, max-age=0, must-revalidate';
  return 'public, max-age=31536000, immutable';
}

function contentType(key, object) {
  const type = object?.httpMetadata?.contentType;
  if (type) return type;
  if (key.endsWith('.svg')) return 'image/svg+xml; charset=utf-8';
  if (key.endsWith('.css')) return 'text/css; charset=utf-8';
  if (key.endsWith('.js')) return 'text/javascript; charset=utf-8';
  if (key.endsWith('.json')) return 'application/json; charset=utf-8';
  if (key.endsWith('.png')) return 'image/png';
  if (key.endsWith('.webp')) return 'image/webp';
  if (key.endsWith('.ico')) return 'image/x-icon';
  if (key.endsWith('.html')) return 'text/html; charset=utf-8';
  if (key.endsWith('.md') || key.endsWith('.txt')) return 'text/plain; charset=utf-8';
  return 'application/octet-stream';
}

function objectKey(request) {
  const url = new URL(request.url);
  const key = decodeURIComponent(url.pathname.replace(/^\/+/, ''));
  return key || 'manifest.json';
}

function notFound() {
  return new Response('Not found\n', {
    status: 404,
    headers: {
      ...CORS_HEADERS,
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method not allowed\n', {
        status: 405,
        headers: {
          ...CORS_HEADERS,
          'Allow': 'GET, HEAD, OPTIONS',
          'Cache-Control': 'no-cache',
          'Content-Type': 'text/plain; charset=utf-8',
        },
      });
    }

    const key = objectKey(request);
    const object = await env.BRAND_ASSETS.get(key, {
      onlyIf: request.headers,
    });

    if (!object) return notFound();

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set('Content-Type', contentType(key, object));
    headers.set('Cache-Control', cacheControl(key));
    headers.set('ETag', object.httpEtag);
    headers.set('X-Content-Type-Options', 'nosniff');
    for (const [name, value] of Object.entries(CORS_HEADERS)) headers.set(name, value);

    if (object.body === null) {
      return new Response(null, { status: 304, headers });
    }

    if (request.method === 'HEAD') {
      return new Response(null, { headers });
    }

    return new Response(object.body, { headers });
  },
};
