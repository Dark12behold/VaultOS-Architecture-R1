import test from "node:test";
import assert from "node:assert/strict";
import { EvidenceObject } from "../src/core/EvidenceObject.js";
import { EvidenceGraph } from "../src/graph/EvidenceGraph.js";

function makeEvidence(id: string, claimId: string, polarity: "supports" | "contradicts") {
  return new EvidenceObject({
    id,
    claimId,
    polarity,
    sourceType: "observation",
    sourceQuality: 0.5,
    provenance: ["src"],
    observedAt: "2026-01-01T00:00:00.000Z",
  });
}

// 16. empty supplied set
test("empty supplied set: byClaimId returns empty for any claim", () => {
  const graph = new EvidenceGraph([]);
  assert.deepEqual(graph.byClaimId("claim-x"), []);
});

// 17. one EvidenceObject grouped by claimId
test("one EvidenceObject appears under its claimId", () => {
  const e = makeEvidence("ev-1", "claim-x", "supports");
  const graph = new EvidenceGraph([e]);
  const group = graph.byClaimId("claim-x");
  assert.equal(group.length, 1);
  assert.equal(group[0].id, "ev-1");
});

// 18. multiple EvidenceObjects same claimId
test("multiple EvidenceObjects under the same claimId are all grouped together", () => {
  const e1 = makeEvidence("ev-1", "claim-x", "supports");
  const e2 = makeEvidence("ev-2", "claim-x", "supports");
  const e3 = makeEvidence("ev-3", "claim-x", "contradicts");
  const graph = new EvidenceGraph([e1, e2, e3]);
  assert.equal(graph.byClaimId("claim-x").length, 3);
});

// 19. mixed polarity under same claimId
test("mixed polarity entries under the same claim are all present in the unfiltered group", () => {
  const e1 = makeEvidence("ev-1", "claim-x", "supports");
  const e2 = makeEvidence("ev-2", "claim-x", "contradicts");
  const graph = new EvidenceGraph([e1, e2]);
  const group = graph.byClaimId("claim-x");
  assert.deepEqual(
    group.map((e) => e.polarity).sort(),
    ["contradicts", "supports"]
  );
});

// 20. polarity filtering
test("byClaimIdAndPolarity returns only the matching-polarity subset", () => {
  const e1 = makeEvidence("ev-1", "claim-x", "supports");
  const e2 = makeEvidence("ev-2", "claim-x", "contradicts");
  const e3 = makeEvidence("ev-3", "claim-x", "supports");
  const graph = new EvidenceGraph([e1, e2, e3]);
  const supports = graph.byClaimIdAndPolarity("claim-x", "supports");
  assert.equal(supports.length, 2);
  assert.ok(supports.every((e) => e.polarity === "supports"));
});

// 21. distinct claimIds never merge
test("distinct claimIds are never merged into one group", () => {
  const e1 = makeEvidence("ev-1", "claim-x", "supports");
  const e2 = makeEvidence("ev-2", "claim-y", "supports");
  const graph = new EvidenceGraph([e1, e2]);
  assert.equal(graph.byClaimId("claim-x").length, 1);
  assert.equal(graph.byClaimId("claim-y").length, 1);
  assert.equal(graph.byClaimId("claim-x")[0].id, "ev-1");
});

// 22. EvidenceObject contentHash unchanged after queries
test("querying the graph never mutates a source EvidenceObject", () => {
  const e = makeEvidence("ev-1", "claim-x", "supports");
  const hashBefore = e.contentHash();
  const graph = new EvidenceGraph([e]);
  graph.byClaimId("claim-x");
  graph.byClaimIdAndPolarity("claim-x", "supports");
  assert.equal(e.contentHash(), hashBefore);
});

// 23. repeated identical queries return identical logical result
test("repeated identical queries against the same graph return identical results", () => {
  const e1 = makeEvidence("ev-1", "claim-x", "supports");
  const e2 = makeEvidence("ev-2", "claim-x", "contradicts");
  const graph = new EvidenceGraph([e1, e2]);
  assert.deepEqual(graph.byClaimId("claim-x"), graph.byClaimId("claim-x"));
  assert.deepEqual(
    graph.byClaimIdAndPolarity("claim-x", "supports"),
    graph.byClaimIdAndPolarity("claim-x", "supports")
  );
});
