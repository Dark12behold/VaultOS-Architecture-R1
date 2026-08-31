import test from "node:test";
import assert from "node:assert/strict";
import { Principle } from "../src/core/Principle.js";
import { PrincipleGraph, PrincipleGraphValidationError } from "../src/graph/PrincipleGraph.js";

// 1. empty supplied set
test("empty supplied set: outgoing and incoming both return empty", () => {
  const graph = new PrincipleGraph([]);
  assert.deepEqual(graph.outgoing("anything"), []);
  assert.deepEqual(graph.incoming("anything"), []);
});

// 2. one Principle with no relations
test("one Principle with no relations: outgoing and incoming both empty for it", () => {
  const p = new Principle({ id: "p-1", statement: "s", domains: ["d"] });
  const graph = new PrincipleGraph([p]);
  assert.deepEqual(graph.outgoing("p-1"), []);
  assert.deepEqual(graph.incoming("p-1"), []);
});

// 3. one outgoing relation
test("one outgoing relation is returned", () => {
  const p = new Principle({ id: "p-1", statement: "s", domains: ["d"] });
  p.addRelation("expressed_by", "p-2");
  const graph = new PrincipleGraph([p]);
  const out = graph.outgoing("p-1");
  assert.equal(out.length, 1);
  assert.equal(out[0].sourceId, "p-1");
  assert.equal(out[0].relation.targetId, "p-2");
  assert.equal(out[0].relation.type, "expressed_by");
});

// 4. targetResolved true
test("targetResolved is true when the target is in the supplied set", () => {
  const p1 = new Principle({ id: "p-1", statement: "s", domains: ["d"] });
  const p2 = new Principle({ id: "p-2", statement: "s", domains: ["d"] });
  p1.addRelation("expressed_by", "p-2");
  const graph = new PrincipleGraph([p1, p2]);
  assert.equal(graph.outgoing("p-1")[0].targetResolved, true);
});

// 5. targetResolved false
test("targetResolved is false when the target is absent from the supplied set", () => {
  const p1 = new Principle({ id: "p-1", statement: "s", domains: ["d"] });
  p1.addRelation("expressed_by", "p-2"); // p-2 never supplied
  const graph = new PrincipleGraph([p1]);
  const out = graph.outgoing("p-1");
  assert.equal(out.length, 1); // never omitted
  assert.equal(out[0].targetResolved, false);
});

// 6. multiple relation types preserved
test("multiple relation types on one Principle are all preserved", () => {
  const p1 = new Principle({ id: "p-1", statement: "s", domains: ["d"] });
  p1.addRelation("expressed_by", "p-2");
  p1.addRelation("constrained_by", "p-3");
  p1.addRelation("scales_into", "p-4");
  const graph = new PrincipleGraph([p1]);
  const out = graph.outgoing("p-1");
  assert.equal(out.length, 3);
  assert.deepEqual(
    out.map((e) => e.relation.type),
    ["expressed_by", "constrained_by", "scales_into"]
  );
});

// 7. type filtering
test("filterByType returns only edges of the requested relation type", () => {
  const p1 = new Principle({ id: "p-1", statement: "s", domains: ["d"] });
  p1.addRelation("expressed_by", "p-2");
  p1.addRelation("constrained_by", "p-3");
  const graph = new PrincipleGraph([p1]);
  const filtered = graph.filterByType(graph.outgoing("p-1"), "constrained_by");
  assert.equal(filtered.length, 1);
  assert.equal(filtered[0].relation.targetId, "p-3");
});

// 8. incoming lookup
test("incoming lookup finds a relation declared by another Principle", () => {
  const p1 = new Principle({ id: "p-1", statement: "s", domains: ["d"] });
  const p2 = new Principle({ id: "p-2", statement: "s", domains: ["d"] });
  p1.addRelation("expressed_by", "p-2");
  const graph = new PrincipleGraph([p1, p2]);
  const inc = graph.incoming("p-2");
  assert.equal(inc.length, 1);
  assert.equal(inc[0].sourceId, "p-1");
});

// 9. outgoing preserves source relation order
test("outgoing preserves the exact insertion order of the source Principle's relations", () => {
  const p1 = new Principle({ id: "p-1", statement: "s", domains: ["d"] });
  p1.addRelation("scales_into", "p-4");
  p1.addRelation("expressed_by", "p-2");
  p1.addRelation("constrained_by", "p-3");
  const graph = new PrincipleGraph([p1]);
  assert.deepEqual(
    graph.outgoing("p-1").map((e) => e.relation.targetId),
    ["p-4", "p-2", "p-3"]
  );
});

// 10. incoming deterministic independent of constructor input order
test("incoming ordering is deterministic regardless of constructor array order", () => {
  const pA = new Principle({ id: "p-a", statement: "s", domains: ["d"] });
  const pB = new Principle({ id: "p-b", statement: "s", domains: ["d"] });
  const pTarget = new Principle({ id: "p-target", statement: "s", domains: ["d"] });
  pA.addRelation("expressed_by", "p-target");
  pB.addRelation("constrained_by", "p-target");

  const graph1 = new PrincipleGraph([pA, pB, pTarget]);
  const graph2 = new PrincipleGraph([pB, pTarget, pA]); // different order supplied

  const inc1 = graph1.incoming("p-target").map((e) => e.sourceId);
  const inc2 = graph2.incoming("p-target").map((e) => e.sourceId);
  assert.deepEqual(inc1, ["p-a", "p-b"]); // ascending source id
  assert.deepEqual(inc1, inc2);
});

// 11. same source/target with different relation types remain distinct
test("same source/target pair with different relation types are both preserved, never collapsed", () => {
  const p1 = new Principle({ id: "p-1", statement: "s", domains: ["d"] });
  p1.addRelation("expressed_by", "p-2");
  p1.addRelation("constrained_by", "p-2");
  const graph = new PrincipleGraph([p1]);
  const out = graph.outgoing("p-1");
  assert.equal(out.length, 2);
  assert.deepEqual(
    out.map((e) => e.relation.type).sort(),
    ["constrained_by", "expressed_by"]
  );
});

// 12. duplicate Principle ids fail
test("duplicate supplied Principle ids fail construction with a validation error", () => {
  const p1a = new Principle({ id: "p-1", statement: "first", domains: ["d"] });
  const p1b = new Principle({ id: "p-1", statement: "second", domains: ["d"] });
  assert.throws(() => new PrincipleGraph([p1a, p1b]), PrincipleGraphValidationError);
});

// 13. two-node cycle behaves normally under single-hop queries
test("a two-node cycle (A->B, B->A) resolves normally under single-hop queries", () => {
  const pA = new Principle({ id: "p-a", statement: "s", domains: ["d"] });
  const pB = new Principle({ id: "p-b", statement: "s", domains: ["d"] });
  pA.addRelation("transferable_to", "p-b");
  pB.addRelation("transferable_to", "p-a");
  const graph = new PrincipleGraph([pA, pB]);
  assert.equal(graph.outgoing("p-a")[0].targetResolved, true);
  assert.equal(graph.outgoing("p-b")[0].targetResolved, true);
  assert.equal(graph.incoming("p-a")[0].sourceId, "p-b");
  assert.equal(graph.incoming("p-b")[0].sourceId, "p-a");
});

// 14. source Principle contentHash unchanged after queries
test("querying the graph never mutates a source Principle", () => {
  const p1 = new Principle({ id: "p-1", statement: "s", domains: ["d"] });
  p1.addRelation("expressed_by", "p-2");
  const hashBefore = p1.contentHash();
  const graph = new PrincipleGraph([p1]);
  graph.outgoing("p-1");
  graph.incoming("p-1");
  graph.filterByType(graph.outgoing("p-1"), "expressed_by");
  assert.equal(p1.contentHash(), hashBefore);
});

// 15. repeated identical queries return identical logical result
test("repeated identical queries against the same graph return identical results", () => {
  const p1 = new Principle({ id: "p-1", statement: "s", domains: ["d"] });
  p1.addRelation("expressed_by", "p-2");
  const graph = new PrincipleGraph([p1]);
  assert.deepEqual(graph.outgoing("p-1"), graph.outgoing("p-1"));
  assert.deepEqual(graph.incoming("p-2"), graph.incoming("p-2"));
});
