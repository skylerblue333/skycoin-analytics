# Sky Analytics Core

A small deterministic TypeScript event-aggregation library for SKYCOIN4444 integrations and standalone engineering use.

**Status: engineering beta.** This repository does not claim a real-time distributed analytics platform, production dashboard, data warehouse, streaming system, or deployed observability service.

## Implemented behavior

`AnalyticsAggregator` accepts bounded in-memory event batches with optional numeric values, timestamps, and string dimensions. It provides:

- total and per-event counts
- numeric count/sum/min/max/average summaries
- per-dimension occurrence counts with deterministic ordering
- defensive snapshot copies
- input bounds and validation for names, dimensions, timestamps, and finite numeric values
- reset semantics for deterministic tests and short-lived processing jobs

```ts
import { AnalyticsAggregator } from "skycoin4444-analytics-core";

const analytics = new AnalyticsAggregator();
analytics.ingest({
  name: "purchase",
  value: 42,
  dimensions: { channel: "web" },
});

console.log(analytics.metric("purchase"));
```

## Verification

```bash
pnpm install
pnpm typecheck
pnpm test
pnpm audit --audit-level=high
pnpm pack
```

GitHub Actions performs real typecheck, tests, dependency audit, and package-smoke verification on Node.js 22. Previous scripts that simply echoed successful build/test/lint results were replaced because they did not verify the repository.

There is intentionally no Docker runtime image: this product is currently a reusable library, not an HTTP analytics service.

## Scope and limitations

Storage is in memory and capped at 100,000 events per aggregator instance. The package does not implement persistence, distributed processing, durable queues, ingestion authentication, PII governance, retention/deletion workflows, streaming windows, percentiles, approximate sketches, dashboards, alerting, or production deployment.

Historical AI/security experiment files remain in the repository for history but are excluded from the package build and are not part of the supported analytics API.

For SKYCOIN4444, use this library behind a stable analytics adapter for deterministic local aggregation or tests. Larger telemetry/data workloads should use a purpose-built durable analytics pipeline instead of extending this in-memory component into a fake platform.

## License

MIT, subject to the checked-in license and applicable third-party licenses.
