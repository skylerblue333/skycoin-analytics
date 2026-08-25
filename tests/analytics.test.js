const assert = require("node:assert/strict");
const { AnalyticsAggregator } = require("../dist/index");

const analytics = new AnalyticsAggregator();
analytics.ingestBatch([
  { name: "purchase", value: 10, timestamp: "2026-08-25T00:00:00Z", dimensions: { channel: "web" } },
  { name: "purchase", value: 30, timestamp: "2026-08-25T00:01:00Z", dimensions: { channel: "web" } },
  { name: "purchase", value: 20, timestamp: "2026-08-25T00:02:00Z", dimensions: { channel: "mobile" } },
  { name: "page_view", dimensions: { channel: "web" } },
]);

assert.equal(analytics.count(), 4);
assert.equal(analytics.count("purchase"), 3);
assert.deepEqual(analytics.metric("purchase"), {
  name: "purchase",
  count: 3,
  sum: 60,
  min: 10,
  max: 30,
  average: 20,
});
assert.deepEqual(analytics.metric("page_view"), {
  name: "page_view",
  count: 0,
  sum: 0,
  min: null,
  max: null,
  average: null,
});
assert.deepEqual(analytics.dimension("purchase", "channel"), {
  dimension: "channel",
  values: [
    { value: "web", count: 2 },
    { value: "mobile", count: 1 },
  ],
});

const snapshot = analytics.snapshot();
snapshot[0].dimensions.channel = "mutated";
assert.equal(analytics.snapshot()[0].dimensions.channel, "web");

assert.throws(() => analytics.ingest({ name: "", value: 1 }), /event name/);
assert.throws(() => analytics.ingest({ name: "bad", value: Number.NaN }), /finite number/);
assert.throws(() => analytics.ingest({ name: "bad", timestamp: "not-a-date" }), /timestamp/);
assert.throws(() => analytics.ingest({ name: "bad", dimensions: { channel: "" } }), /dimension values/);

analytics.reset();
assert.equal(analytics.count(), 0);
console.log("analytics tests passed");
