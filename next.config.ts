import type { NextConfig } from "next";

// next.config.ts per 91-stack.md §3. CSP is deliberately absent: it is deferred
// to the launch slice (D-027, mode A allowlist, Report-Only first).

const securityHeaders = [
  // Value not fixed by the plan: 2 years + subdomains; `preload` is left to the
  // launch slice because it commits the production domain to the preload list.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  { key: "X-Frame-Options", value: "DENY" },
];

// Every non-production deploy sends noindex (91-stack.md §3, D-027).
// VERCEL_ENV is "production" | "preview" | "development" on Vercel and unset locally.
const isProductionDeploy = process.env.VERCEL_ENV === "production";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  trailingSlash: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/**" },
    ],
    minimumCacheTTL: 2592000,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: isProductionDeploy
          ? securityHeaders
          : [...securityHeaders, { key: "X-Robots-Tag", value: "noindex" }],
      },
    ];
  },
};

export default nextConfig;
