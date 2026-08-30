import json
import tempfile
import unittest
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'tools'))
from analyze_runs import load_runs, summarize


class AnalyzeRunsTests(unittest.TestCase):
    def make_run(self, path: Path, actor='GitHub.fetch_file', latency=100, product='PASS', procedure='EFFICIENT'):
        path.write_text(json.dumps({
            'schema': 'chatgpt.reasoning.procedure-run.v1',
            'run_id': path.stem,
            'goal': 'test',
            'task_class': 'repository-read',
            'starting_state': 'known repo',
            'route': [{
                'actor': actor,
                'action': 'read',
                'input_shape': 'path',
                'actual_latency_ms': latency,
                'verification_cost': 1
            }],
            'observations': {'friction': [], 'ambiguities': [], 'holes': [], 'repairs': []},
            'product_outcome': product,
            'procedure_outcome': procedure,
            'reusable_rule': 'prefer direct path reads when path is known',
            'negative_rule': None,
            'disposition': 'ADOPT_LOCAL'
        }), encoding='utf-8')

    def test_load_filters_schema(self):
        with tempfile.TemporaryDirectory() as td:
            root = Path(td)
            self.make_run(root / 'good.json')
            (root / 'other.json').write_text('{"schema":"other"}', encoding='utf-8')
            self.assertEqual(len(load_runs(root)), 1)

    def test_summary_counts_and_latency(self):
        with tempfile.TemporaryDirectory() as td:
            root = Path(td)
            self.make_run(root / 'a.json', latency=100)
            self.make_run(root / 'b.json', latency=300)
            summary = summarize(load_runs(root))
            self.assertEqual(summary['run_count'], 2)
            self.assertEqual(summary['product_outcomes']['PASS'], 2)
            self.assertEqual(summary['actors']['GitHub.fetch_file']['median_latency_ms'], 200)
            self.assertEqual(summary['reusable_rules'][0]['observations'], 2)

    def test_procedure_failure_preserved(self):
        with tempfile.TemporaryDirectory() as td:
            root = Path(td)
            self.make_run(root / 'a.json', procedure='FAULTY', product='FAIL')
            summary = summarize(load_runs(root))
            self.assertEqual(summary['product_outcomes']['FAIL'], 1)
            self.assertEqual(summary['procedure_outcomes']['FAULTY'], 1)


if __name__ == '__main__':
    unittest.main()
