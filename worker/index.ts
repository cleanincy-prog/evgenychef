/// <reference types="vite/client" />
/** Shared Worker for the evening-plan site and its loopback preview. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface LocalAssetFetcher {
  fetch(request: Request): Promise<Response>;
}

interface Env {
  ASSETS: LocalAssetFetcher;
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

function assetUrlFor(path: string, base: string): URL {
  const assetUrl = new URL(path, base);
  if (import.meta.env.PROD && assetUrl.pathname.startsWith("/media/")) {
    assetUrl.pathname = `/_site-media/${assetUrl.pathname.slice("/media/".length)}`;
  }
  return assetUrl;
}

async function serveStaticAsset(request: Request, env: Env, pathname: string): Promise<Response> {
  const assetRequest = new Request(assetUrlFor(request.url, request.url), request);
  // Some asset servers interpret a suffix as 0-N. Handle suffixes here using
  // the complete file length so the response contains the actual last bytes.
  if (pathname.endsWith(".mp4") && request.method === "GET" &&
    request.headers.get("range")?.trim().startsWith("bytes=-")) {
    assetRequest.headers.delete("range");
  }
  const response = await env.ASSETS.fetch(assetRequest);
  const headers = new Headers(response.headers);
  const cacheable = response.ok || response.status === 304;
  headers.set("cache-control", cacheable ? cacheControlFor(pathname) : "no-store");
  if (cacheable && pathname.endsWith(".webp")) headers.set("content-type", "image/webp");

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
    headers.set("cache-control", "no-store");
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
        fetchAsset: (path) => env.ASSETS.fetch(new Request(assetUrlFor(path, request.url))),
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

    return withHeaders(response, new Headers(response.headers));
  },
};

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const response = await worker.fetch(request, env, ctx);
    const headers = new Headers(response.headers);
    const hostname = new URL(request.url).hostname;
    if (["localhost", "127.0.0.1", "[::1]"].includes(hostname)) {
      headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    } else {
      headers.delete("X-Robots-Tag");
    }
    return withHeaders(response, headers);
  },
};
