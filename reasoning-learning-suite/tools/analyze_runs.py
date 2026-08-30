#!/usr/bin/env python3
import json
import statistics
import sys
from collections import defaultdict
from pathlib import Path


PROMOTION_MIN_OBSERVATIONS = 3


def load_runs(root: Path):
    runs = []
    for path in sorted(root.rglob('*.json')):
        try:
            data = json.loads(path.read_text(encoding='utf-8'))
        except Exception:
            continue
        if isinstance(data, dict) and data.get('schema') == 'chatgpt.reasoning.procedure-run.v1':
            data['_path'] = str(path)
            runs.append(data)
    return runs


def _number(value):
    return isinstance(value, (int, float)) and not isinstance(value, bool)


def run_metrics(run):
    route = run.get('route', [])
    latencies = [s.get('actual_latency_ms') for s in route]
    verification = [s.get('verification_cost') for s in route]
    latency_complete = bool(route) and all(_number(v) for v in latencies)
    verification_complete = bool(route) and all(_number(v) for v in verification)
    recovery = run.get('recovery_cost', 0)
    recovery_complete = _number(recovery)
    quality = run.get('quality', {}) if isinstance(run.get('quality', {}), dict) else {}
    correctness = quality.get('correctness')
    evidence_quality = quality.get('evidence_quality')
    reliability = quality.get('result_reliability')
    quality_complete = all(_number(v) for v in (correctness, evidence_quality, reliability))

    measured = latency_complete and verification_complete and recovery_complete and quality_complete
    return {
        'run_id': run.get('run_id'),
        'task_class': run.get('task_class'),
        'experiment_id': run.get('experiment_id'),
        'route_variant': run.get('route_variant'),
        'calls': len(route),
        'total_latency_ms': sum(latencies) if latency_complete else None,
        'verification_cost': sum(verification) if verification_complete else None,
        'recovery_cost': recovery if recovery_complete else None,
        'correctness': correctness if _number(correctness) else None,
        'evidence_quality': evidence_quality if _number(evidence_quality) else None,
        'result_reliability': reliability if _number(reliability) else None,
        'measured': measured,
        'product_outcome': run.get('product_outcome'),
        'procedure_outcome': run.get('procedure_outcome'),
    }


def dominates(a, b):
    """Pareto dominance: lower cost and higher quality, with no arbitrary weights."""
    if not (a.get('measured') and b.get('measured')):
        return False
    lower_better = ('total_latency_ms', 'calls', 'verification_cost', 'recovery_cost')
    higher_better = ('correctness', 'evidence_quality', 'result_reliability')
    no_worse = all(a[k] <= b[k] for k in lower_better) and all(a[k] >= b[k] for k in higher_better)
    strictly_better = any(a[k] < b[k] for k in lower_better) or any(a[k] > b[k] for k in higher_better)
    return no_worse and strictly_better


def compare_experiments(runs):
    groups = defaultdict(list)
    for run in runs:
        exp = run.get('experiment_id')
        if exp:
            groups[exp].append(run_metrics(run))

    comparisons = []
    for exp, variants in sorted(groups.items()):
        labels = {v.get('route_variant') for v in variants if v.get('route_variant')}
        complete = len(variants) >= 2 and len(labels) >= 2 and all(v['measured'] for v in variants)
        winners = []
        if complete:
            passing = [v for v in variants if v['product_outcome'] == 'PASS']
            for candidate in passing:
                if all(candidate is other or dominates(candidate, other) for other in passing):
                    winners.append(candidate.get('route_variant'))
        comparisons.append({
            'experiment_id': exp,
            'complete': complete,
            'variants': variants,
            'pareto_winners': sorted(set(w for w in winners if w)),
            'conclusion': (
                'DOMINANT_ROUTE' if len(set(winners)) == 1 else
                'TRADEOFF_OR_TIE' if complete else
                'INSUFFICIENT_MEASUREMENT'
            ),
        })
    return comparisons


def summarize(runs):
    by_actor = defaultdict(lambda: {'latencies': [], 'verification': [], 'steps': 0})
    product = defaultdict(int)
    procedure = defaultdict(int)
    rule_runs = defaultdict(list)
    negative_rules = defaultdict(int)
    measured_runs = 0
    claim_violations = []

    for run in runs:
        metrics = run_metrics(run)
        if metrics['measured']:
            measured_runs += 1
        product[run.get('product_outcome', 'UNKNOWN')] += 1
        procedure[run.get('procedure_outcome', 'UNKNOWN')] += 1
        if run.get('reusable_rule'):
            rule_runs[run['reusable_rule']].append(run)
        if run.get('negative_rule'):
            negative_rules[run['negative_rule']] += 1
        if run.get('procedure_outcome') == 'EFFICIENT':
            if not metrics['measured']:
                claim_violations.append({
                    'run_id': run.get('run_id'),
                    'violation': 'EFFICIENT_WITHOUT_COMPLETE_MEASUREMENT'
                })
            elif not run.get('experiment_id'):
                claim_violations.append({
                    'run_id': run.get('run_id'),
                    'violation': 'EFFICIENT_WITHOUT_COMPARISON_EXPERIMENT'
                })
        for step in run.get('route', []):
            actor = step.get('actor', 'UNKNOWN')
            by_actor[actor]['steps'] += 1
            if _number(step.get('actual_latency_ms')):
                by_actor[actor]['latencies'].append(step['actual_latency_ms'])
            if _number(step.get('verification_cost')):
                by_actor[actor]['verification'].append(step['verification_cost'])

    actors = {}
    for actor, values in sorted(by_actor.items()):
        lat = values['latencies']
        ver = values['verification']
        actors[actor] = {
            'steps': values['steps'],
            'measured_latency_steps': len(lat),
            'latency_coverage': (len(lat) / values['steps']) if values['steps'] else 0,
            'median_latency_ms': statistics.median(lat) if lat else None,
            'mean_latency_ms': statistics.mean(lat) if lat else None,
            'mean_verification_cost': statistics.mean(ver) if ver else None,
        }

    reusable = []
    for rule, observed_runs in sorted(rule_runs.items(), key=lambda x: (-len(x[1]), x[0])):
        measured = sum(1 for r in observed_runs if run_metrics(r)['measured'])
        bad = sum(1 for r in observed_runs if r.get('product_outcome') == 'FAIL' or r.get('procedure_outcome') in ('FAULTY', 'INEFFICIENT'))
        observations = len(observed_runs)
        status = 'OBSERVE'
        if observations >= PROMOTION_MIN_OBSERVATIONS and measured >= 2 and bad == 0:
            status = 'CANDIDATE'
        reusable.append({
            'rule': rule,
            'observations': observations,
            'measured_observations': measured,
            'contradictory_or_bad_observations': bad,
            'promotion_status': status,
        })

    return {
        'schema': 'chatgpt.reasoning.learning-summary.v2',
        'run_count': len(runs),
        'measured_run_count': measured_runs,
        'measurement_coverage': (measured_runs / len(runs)) if runs else 0,
        'product_outcomes': dict(sorted(product.items())),
        'procedure_outcomes': dict(sorted(procedure.items())),
        'actors': actors,
        'claim_violations': claim_violations,
        'experiments': compare_experiments(runs),
        'reusable_rules': reusable,
        'negative_rules': [{'rule': k, 'observations': v} for k, v in sorted(negative_rules.items(), key=lambda x: (-x[1], x[0]))],
        'promotion_policy': {
            'minimum_observations': PROMOTION_MIN_OBSERVATIONS,
            'minimum_measured_observations': 2,
            'requires_no_bad_observations': True,
            'note': 'CANDIDATE is not automatic default adoption.'
        },
    }


def main(argv):
    root = Path(argv[1] if len(argv) > 1 else 'runs')
    output = Path(argv[2]) if len(argv) > 2 else None
    summary = summarize(load_runs(root))
    text = json.dumps(summary, indent=2, sort_keys=True) + '\n'
    if output:
        output.parent.mkdir(parents=True, exist_ok=True)
        output.write_text(text, encoding='utf-8')
    else:
        sys.stdout.write(text)
    return 0


if __name__ == '__main__':
    raise SystemExit(main(sys.argv))
