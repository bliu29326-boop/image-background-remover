export default {
  default: {
    override: {
      wrapper: "cloudflare-node",
      converter: "edge",
      proxyExternalRequest: "fetch",
      incrementalCache: "dummy",
      tagCache: "dummy",
      queue: "direct",
    },
  },
  edgeExternals: ["node:crypto"],
  middleware: {
    external: true,
    override: {
      wrapper: "cloudflare-edge",
      converter: "edge",
      proxyExternalRequest: "fetch",
      incrementalCache: "dummy",
      tagCache: "dummy",
      queue: "direct",
    },
  },
  functions: {
    authApi: {
      runtime: "edge",
      routes: ["app/api/auth/[...nextauth]/route"],
      patterns: ["/api/auth/*"],
    },
    authError: {
      runtime: "edge",
      routes: ["app/auth/error/page"],
      patterns: ["/auth/error"],
    },
  },
};
