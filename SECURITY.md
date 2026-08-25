# Security Notes

## Status

Sky Analytics Core is an engineering-beta in-memory aggregation library. It is not an authenticated ingestion service or a production data-governance system.

## Data handling

Treat event names, values, timestamps, and dimensions as application data. Do not send secrets, credentials, private keys, session tokens, regulated data, or unnecessary personal information into analytics events. This package does not encrypt, persist, redact, classify, retain, delete, or access-control data.

The aggregator validates structural bounds to reduce accidental unbounded input. Those bounds are not a denial-of-service defense for hostile public traffic because the library has no network/authentication boundary.

## Consumer responsibilities

Applications exposing analytics ingestion must independently implement authentication/authorization, payload-size limits, rate limiting, data classification, consent/retention policies, tenant isolation, durable storage controls, deletion workflows, transport security, audit logging, and incident response as appropriate.

CI verifies TypeScript compilation, deterministic tests, dependency audit, and package creation. These checks are not a security audit or production certification.
