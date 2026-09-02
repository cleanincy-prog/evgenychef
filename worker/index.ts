/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

const IMMUTABLE_CACHE = "public, max-age=31536000, immutable";
const MEDIA_CACHE = "public, max-age=86400, stale-while-revalidate=604800";
const HTML_CACHE = "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400";

function isStaticAsset(pathname: string): boolean {
  return (
    pathname.startsWith("/_next/static/") ||
    pathname.startsWith("/media/") ||
    pathname.startsWith("/fonts/") ||
    pathname === "/favicon.svg" ||
    pathname === "/og.png"
  );
}

function cacheControlFor(pathname: string): string {
  return pathname.startsWith("/_next/static/") ? IMMUTABLE_CACHE : MEDIA_CACHE;
}

function withHeaders(response: Response, headers: Headers, body: BodyInit | null = response.body): Response {
  return new Response(body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function parseByteRange(rangeHeader: string, length: number): { start: number; end: number } | null {
  const match = /^bytes=(\d*)-(\d*)$/.exec(rangeHeader.trim());
  if (!match || (!match[1] && !match[2]) || length <= 0) return null;

  let start: number;
  let end: number;

  if (!match[1]) {
    const suffixLength = Number(match[2]);
    if (!Number.isInteger(suffixLength) || suffixLength <= 0) return null;
    start = Math.max(length - suffixLength, 0);
    end = length - 1;
  } else {
    start = Number(match[1]);
    end = match[2] ? Number(match[2]) : length - 1;
    if (!Number.isInteger(start) || !Number.isInteger(end) || start < 0 || end < start) return null;
  }

  if (start >= length) return null;
  return { start, end: Math.min(end, length - 1) };
}

async function serveStaticAsset(request: Request, env: Env, pathname: string): Promise<Response> {
  const response = await env.ASSETS.fetch(request);
  const headers = new Headers(response.headers);
  headers.set("cache-control", cacheControlFor(pathname));

  if (!pathname.endsWith(".mp4")) {
    return withHeaders(response, headers, request.method === "HEAD" ? null : response.body);
  }

  headers.set("accept-ranges", "bytes");
  const rangeHeader = request.headers.get("range");
  if (request.method !== "GET" || !rangeHeader || !response.ok || response.status === 206) {
    return withHeaders(response, headers, request.method === "HEAD" ? null : response.body);
  }

  const source = await response.arrayBuffer();
  const range = parseByteRange(rangeHeader, source.byteLength);
  if (!range) {
    headers.set("content-range", `bytes */${source.byteLength}`);
    headers.set("content-length", "0");
    return new Response(null, { status: 416, headers });
  }

  const body = source.slice(range.start, range.end + 1);
  headers.set("content-range", `bytes ${range.start}-${range.end}/${source.byteLength}`);
  headers.set("content-length", String(body.byteLength));
  return new Response(body, { status: 206, headers });
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/_vinext/image" && env?.ASSETS && env?.IMAGES) {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      const response = await handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
      const headers = new Headers(response.headers);
      headers.set("cache-control", MEDIA_CACHE);
      return withHeaders(response, headers);
    }

    if (
      (request.method === "GET" || request.method === "HEAD") &&
      isStaticAsset(url.pathname) &&
      env?.ASSETS
    ) {
      return serveStaticAsset(request, env, url.pathname);
    }

    const response = await handler.fetch(request, env, ctx);
    if (
      request.method === "GET" &&
      response.ok &&
      (url.pathname === "/" || url.pathname === "/robots.txt" || url.pathname === "/sitemap.xml")
    ) {
      const headers = new Headers(response.headers);
      headers.set("cache-control", HTML_CACHE);
      return withHeaders(response, headers);
    }

    return response;
  },
};

export default worker;
