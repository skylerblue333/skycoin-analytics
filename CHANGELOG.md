# Changelog

## 1.0.0-beta.1 - 2026-08-25

- Replaced echo-only build/test/lint scripts with real TypeScript compilation and tests.
- Added bounded in-memory event ingestion and batch validation.
- Added numeric metric summaries and deterministic dimension aggregation.
- Added defensive snapshots, reset behavior, and input/error coverage.
- Scoped the published package to the analytics API while preserving historical experiment files outside the supported build.
- Added dependency audit and package-smoke CI on Node.js 22.
- Removed nonfunctional Docker/Docker Compose deployment claims.
- Added explicit data/security scope documentation.

Persistence, streaming infrastructure, dashboards, authentication, production deployment, and distributed analytics are not claimed.
