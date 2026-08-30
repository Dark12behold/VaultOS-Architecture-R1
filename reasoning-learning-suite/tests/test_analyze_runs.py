import json
import tempfile
import unittest
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'tools'))
from analyze_runs import load_runs, summarize, run_metrics, dominates


class AnalyzeRunsTests(unittest.TestCase):
    def make_run(self, path: Path, actor='GitHub.fetch_file', latency=100, product='PASS', procedure='ACCEPTABLE',
                 experiment_id=None, route_variant=None, reusable_rule='prefer direct path reads when path is known',
                 measured=True, verification_cost=1, recovery_cost=0, correctness=1.0, evidence_quality=1.0,
                 result_reliability=1.0, calls=1):
        route = []
        for _ in range(calls):
            step = {
                'actor': actor,
                'action': 'read',
                'input_shape': 'path',
                'verification_cost': verification_cost,
            }
            if measured:
                step['actual_latency_ms'] = latency
            route.append(step)
        data = {
            'schema': 'chatgpt.reasoning.procedure-run.v1',
            'run_id': path.stem,
            'goal': 'test',
            'task_class': 'repository-read',
            'starting_state': 'known repo',
            'route': route,
            'observations': {'friction': [], 'ambiguities': [], 'holes': [], 'repairs': []},
            'product_outcome': product,
            'procedure_outcome': procedure,
            'reusable_rule': reusable_rule,
            'negative_rule': None,
            'disposition': 'ADOPT_LOCAL',
            'recovery_cost': recovery_cost,
        }
        if measured:
            data['quality'] = {
                'correctness': correctness,
                'evidence_quality': evidence_quality,
                'result_reliability': result_reliability,
            }
        if experiment_id:
            data['experiment_id'] = experiment_id
        if route_variant:
            data['route_variant'] = route_variant
        path.write_text(json.dumps(data), encoding='utf-8')

    def test_load_filters_schema(self):
        with tempfile.TemporaryDirectory() as td:
            root = Path(td)
            self.make_run(root / 'good.json')
            (root / 'other.json').write_text('{"schema":"other"}', encoding='utf-8')
            self.assertEqual(len(load_runs(root)), 1)

    def test_summary_counts_latency_and_measurement_coverage(self):
        with tempfile.TemporaryDirectory() as td:
            root = Path(td)
            self.make_run(root / 'a.json', latency=100)
            self.make_run(root / 'b.json', latency=300, measured=False)
            summary = summarize(load_runs(root))
            self.assertEqual(summary['run_count'], 2)
            self.assertEqual(summary['measured_run_count'], 1)
            self.assertEqual(summary['measurement_coverage'], 0.5)
            self.assertEqual(summary['actors']['GitHub.fetch_file']['median_latency_ms'], 100)
            self.assertEqual(summary['actors']['GitHub.fetch_file']['latency_coverage'], 0.5)

    def test_efficient_claim_without_measurement_is_flagged(self):
        with tempfile.TemporaryDirectory() as td:
            root = Path(td)
            self.make_run(root / 'a.json', procedure='EFFICIENT', measured=False)
            summary = summarize(load_runs(root))
            self.assertEqual(summary['claim_violations'][0]['violation'], 'EFFICIENT_WITHOUT_COMPLETE_MEASUREMENT')

    def test_efficient_claim_without_comparison_is_flagged(self):
        with tempfile.TemporaryDirectory() as td:
            root = Path(td)
            self.make_run(root / 'a.json', procedure='EFFICIENT', measured=True)
            summary = summarize(load_runs(root))
            self.assertEqual(summary['claim_violations'][0]['violation'], 'EFFICIENT_WITHOUT_COMPARISON_EXPERIMENT')

    def test_pareto_dominance_prefers_no_worse_quality_and_lower_cost(self):
        a = {
            'measured': True, 'total_latency_ms': 100, 'calls': 1, 'verification_cost': 1, 'recovery_cost': 0,
            'correctness': 1.0, 'evidence_quality': 1.0, 'result_reliability': 1.0
        }
        b = {
            'measured': True, 'total_latency_ms': 200, 'calls': 2, 'verification_cost': 2, 'recovery_cost': 0,
            'correctness': 1.0, 'evidence_quality': 1.0, 'result_reliability': 1.0
        }
        self.assertTrue(dominates(a, b))
        self.assertFalse(dominates(b, a))

    def test_experiment_reports_dominant_route(self):
        with tempfile.TemporaryDirectory() as td:
            root = Path(td)
            self.make_run(root / 'a.json', latency=100, experiment_id='exp-1', route_variant='direct', calls=1)
            self.make_run(root / 'b.json', latency=150, experiment_id='exp-1', route_variant='search', calls=2)
            summary = summarize(load_runs(root))
            exp = summary['experiments'][0]
            self.assertTrue(exp['complete'])
            self.assertEqual(exp['conclusion'], 'DOMINANT_ROUTE')
            self.assertEqual(exp['pareto_winners'], ['direct'])

    def test_tradeoff_does_not_fake_single_winner(self):
        with tempfile.TemporaryDirectory() as td:
            root = Path(td)
            self.make_run(root / 'a.json', latency=100, experiment_id='exp-2', route_variant='fast', evidence_quality=0.8)
            self.make_run(root / 'b.json', latency=200, experiment_id='exp-2', route_variant='strong', evidence_quality=1.0)
            summary = summarize(load_runs(root))
            exp = summary['experiments'][0]
            self.assertEqual(exp['conclusion'], 'TRADEOFF_OR_TIE')
            self.assertEqual(exp['pareto_winners'], [])

    def test_rule_requires_repetition_and_measurement_before_candidate(self):
        with tempfile.TemporaryDirectory() as td:
            root = Path(td)
            for name, measured in [('a', True), ('b', True), ('c', False)]:
                self.make_run(root / f'{name}.json', measured=measured)
            summary = summarize(load_runs(root))
            rule = summary['reusable_rules'][0]
            self.assertEqual(rule['observations'], 3)
            self.assertEqual(rule['measured_observations'], 2)
            self.assertEqual(rule['promotion_status'], 'CANDIDATE')

    def test_bad_observation_blocks_rule_candidate(self):
        with tempfile.TemporaryDirectory() as td:
            root = Path(td)
            self.make_run(root / 'a.json')
            self.make_run(root / 'b.json')
            self.make_run(root / 'c.json', product='FAIL', procedure='FAULTY')
            summary = summarize(load_runs(root))
            self.assertEqual(summary['reusable_rules'][0]['promotion_status'], 'OBSERVE')


if __name__ == '__main__':
    unittest.main()
