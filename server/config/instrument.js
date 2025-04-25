// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: "https://b766b1e231b2ae9723f264e75a278960@o4509206326345728.ingest.us.sentry.io/4509206330933250",
  integrations: [Sentry.mongooseIntegration()],
});
