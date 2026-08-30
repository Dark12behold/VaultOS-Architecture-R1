import hashlib
import json
import tempfile
import unittest
from pathlib import Path

from tests.r1.harness import evaluate


def valid_manifest(component_path="component.txt"):
    return {
        "schema": "vaultos.r1.build.v1",
        "architecture_revision": "R1",
        "build_id": "r1-test-build",
        "source_commit": "deadbeef",
        "components": [
            {"id": "core", "path": component_path, "role": "test component"}
        ],
        "authority_boundaries": {
            "user_authority_preserved": True,
            "generator_is_sole_evaluator": False,
            "execution_equals_success": False,
        },
        "verification": {
            "expected_behavior_refs": ["architecture/R1-DEVELOPMENTAL-TEST-PHILOSOPHY.md"],
            "independent_evaluator_required": True,
            "rollback_ref": "reject candidate",
        },
    }


class HarnessTests(unittest.TestCase):
    def make_build(self, manifest=None, component_bytes=b"ok"):
        td = tempfile.TemporaryDirectory()
        root = Path(td.name)
        (root / "component.txt").write_bytes(component_bytes)
        data = manifest if manifest is not None else valid_manifest()
        (root / "manifest.json").write_text(json.dumps(data), encoding="utf-8")
        return td, root

    def test_valid_candidate_passes(self):
        td, root = self.make_build()
        try:
            result, code = evaluate(root)
            self.assertEqual("PASS", result["status"])
            self.assertEqual(0, code)
        finally:
            td.cleanup()

    def test_missing_candidate_is_blocked(self):
        with tempfile.TemporaryDirectory() as td:
            missing = Path(td) / "absent"
            result, code = evaluate(missing)
            self.assertEqual("BLOCKED", result["status"])
            self.assertEqual(3, code)

    def test_wrong_revision_fails(self):
        manifest = valid_manifest()
        manifest["architecture_revision"] = "R2"
        td, root = self.make_build(manifest)
        try:
            result, code = evaluate(root)
            self.assertEqual("FAIL", result["status"])
            self.assertNotEqual(0, code)
        finally:
            td.cleanup()

    def test_generator_cannot_be_sole_evaluator(self):
        manifest = valid_manifest()
        manifest["authority_boundaries"]["generator_is_sole_evaluator"] = True
        td, root = self.make_build(manifest)
        try:
            result, _ = evaluate(root)
            self.assertEqual("FAIL", result["status"])
        finally:
            td.cleanup()

    def test_path_escape_fails(self):
        manifest = valid_manifest("../outside.txt")
        td, root = self.make_build(manifest)
        try:
            (root.parent / "outside.txt").write_text("outside", encoding="utf-8")
            result, _ = evaluate(root)
            self.assertEqual("FAIL", result["status"])
        finally:
            try:
                (root.parent / "outside.txt").unlink()
            except FileNotFoundError:
                pass
            td.cleanup()

    def test_digest_mismatch_fails(self):
        manifest = valid_manifest()
        manifest["components"][0]["sha256"] = "0" * 64
        td, root = self.make_build(manifest, b"actual")
        try:
            result, _ = evaluate(root)
            self.assertEqual("FAIL", result["status"])
        finally:
            td.cleanup()

    def test_digest_match_passes(self):
        body = b"actual"
        manifest = valid_manifest()
        manifest["components"][0]["sha256"] = hashlib.sha256(body).hexdigest()
        td, root = self.make_build(manifest, body)
        try:
            result, code = evaluate(root)
            self.assertEqual("PASS", result["status"])
            self.assertEqual(0, code)
        finally:
            td.cleanup()

    def test_duplicate_component_ids_fail(self):
        manifest = valid_manifest()
        manifest["components"].append({"id": "core", "path": "component.txt", "role": "duplicate"})
        td, root = self.make_build(manifest)
        try:
            result, _ = evaluate(root)
            self.assertEqual("FAIL", result["status"])
        finally:
            td.cleanup()


if __name__ == "__main__":
    unittest.main()
