#!/usr/bin/env python3
import argparse
import hashlib
import json
import sys
from dataclasses import dataclass, asdict
from pathlib import Path

HARNESS_GENERATION = "T1-r1-deterministic-v1"

@dataclass
class Check:
    id: str
    status: str
    message: str


def sha256_file(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def add(checks, cid, ok, message):
    checks.append(Check(cid, "PASS" if ok else "FAIL", message))
    return ok


def evaluate(build_path: Path):
    build_path = build_path.resolve()
    manifest_path = build_path / "manifest.json"
    checks = []

    if not build_path.exists() or not manifest_path.exists():
        return {
            "harness_generation": HARNESS_GENERATION,
            "build_path": str(build_path),
            "status": "BLOCKED",
            "reason": "candidate directory or manifest.json is absent",
            "checks": [],
        }, 3

    try:
        raw = manifest_path.read_bytes()
        manifest = json.loads(raw.decode("utf-8"))
    except Exception as exc:
        result = {
            "harness_generation": HARNESS_GENERATION,
            "build_path": str(build_path),
            "status": "FAIL",
            "reason": f"manifest parse failed: {exc}",
            "checks": [asdict(Check("manifest.json-valid", "FAIL", str(exc)))],
        }
        return result, 1

    add(checks, "schema", manifest.get("schema") == "vaultos.r1.build.v1", "schema must equal vaultos.r1.build.v1")
    add(checks, "architecture-revision", manifest.get("architecture_revision") == "R1", "architecture_revision must equal R1")
    add(checks, "build-id", bool(str(manifest.get("build_id", "")).strip()), "build_id must be non-empty")
    add(checks, "source-commit", bool(str(manifest.get("source_commit", "")).strip()), "source_commit must be non-empty")

    components = manifest.get("components")
    components_ok = isinstance(components, list) and len(components) > 0
    add(checks, "components-present", components_ok, "components must be a non-empty array")

    if components_ok:
        ids = [c.get("id") for c in components if isinstance(c, dict)]
        add(checks, "component-ids", len(ids) == len(components) and all(isinstance(i, str) and i.strip() for i in ids), "each component must have a non-empty id")
        add(checks, "component-ids-unique", len(ids) == len(set(ids)), "component ids must be unique")

        for index, component in enumerate(components):
            if not isinstance(component, dict):
                add(checks, f"component-{index}-record", False, "component must be an object")
                continue
            cid = str(component.get("id") or index)
            rel = component.get("path")
            role = component.get("role")
            add(checks, f"component-{cid}-role", isinstance(role, str) and bool(role.strip()), "component role must be non-empty")
            if not isinstance(rel, str) or not rel.strip():
                add(checks, f"component-{cid}-path", False, "component path must be non-empty")
                continue
            candidate = (build_path / rel).resolve()
            inside = candidate == build_path or build_path in candidate.parents
            add(checks, f"component-{cid}-contained", inside, "component path must remain within r1-build")
            if not inside:
                continue
            exists = candidate.exists() and candidate.is_file()
            add(checks, f"component-{cid}-exists", exists, f"declared component must exist: {rel}")
            declared = component.get("sha256")
            if declared is not None:
                digest_ok = exists and isinstance(declared, str) and declared.lower() == sha256_file(candidate)
                add(checks, f"component-{cid}-sha256", digest_ok, "declared SHA-256 must match file contents")

    auth = manifest.get("authority_boundaries")
    auth_ok = isinstance(auth, dict)
    add(checks, "authority-boundaries-present", auth_ok, "authority_boundaries must be an object")
    if auth_ok:
        add(checks, "user-authority", auth.get("user_authority_preserved") is True, "user authority must be explicitly preserved")
        add(checks, "generator-evaluator-separation", auth.get("generator_is_sole_evaluator") is False, "generator cannot be sole evaluator")
        add(checks, "execution-success-separation", auth.get("execution_equals_success") is False, "execution cannot equal success")

    verification = manifest.get("verification")
    verification_ok = isinstance(verification, dict)
    add(checks, "verification-present", verification_ok, "verification must be an object")
    if verification_ok:
        refs = verification.get("expected_behavior_refs")
        add(checks, "expected-behavior-refs", isinstance(refs, list) and len(refs) > 0 and all(isinstance(x, str) and x.strip() for x in refs), "expected_behavior_refs must be non-empty")
        add(checks, "independent-evaluator-required", verification.get("independent_evaluator_required") is True, "R1 candidate must require independent evaluation")
        add(checks, "rollback-ref", bool(str(verification.get("rollback_ref", "")).strip()), "rollback_ref must be non-empty")

    failed = [c for c in checks if c.status == "FAIL"]
    result = {
        "harness_generation": HARNESS_GENERATION,
        "build_path": str(build_path),
        "manifest_sha256": hashlib.sha256(raw).hexdigest(),
        "architecture_revision": manifest.get("architecture_revision"),
        "build_id": manifest.get("build_id"),
        "source_commit": manifest.get("source_commit"),
        "status": "FAIL" if failed else "PASS",
        "check_count": len(checks),
        "failed_count": len(failed),
        "checks": [asdict(c) for c in checks],
    }
    return result, 1 if failed else 0


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--build-path", default="r1-build")
    parser.add_argument("--output")
    args = parser.parse_args()

    result, code = evaluate(Path(args.build_path))
    rendered = json.dumps(result, indent=2, sort_keys=True)
    print(rendered)
    if args.output:
        out = Path(args.output)
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(rendered + "\n", encoding="utf-8")
    sys.exit(code)


if __name__ == "__main__":
    main()
