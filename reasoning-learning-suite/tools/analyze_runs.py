#!/usr/bin/env python3
import json
import statistics
import sys
from collections import defaultdict
from pathlib import Path


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


def summarize(runs):
    by_actor = defaultdict(lambda: {'latencies': [], 'verification': [], 'steps': 0})
    product = defaultdict(int)
    procedure = defaultdict(int)
    rules = defaultdict(int)
    negative_rules = defaultdict(int)

    for run in runs:
        product[run.get('product_outcome', 'UNKNOWN')] += 1
        procedure[run.get('procedure_outcome', 'UNKNOWN')] += 1
        if run.get('reusable_rule'):
            rules[run['reusable_rule']] += 1
        if run.get('negative_rule'):
            negative_rules[run['negative_rule']] += 1
        for step in run.get('route', []):
            actor = step.get('actor', 'UNKNOWN')
            by_actor[actor]['steps'] += 1
            if isinstance(step.get('actual_latency_ms'), (int, float)):
                by_actor[actor]['latencies'].append(step['actual_latency_ms'])
            if isinstance(step.get('verification_cost'), (int, float)):
                by_actor[actor]['verification'].append(step['verification_cost'])

    actors = {}
    for actor, values in sorted(by_actor.items()):
        lat = values['latencies']
        ver = values['verification']
        actors[actor] = {
            'steps': values['steps'],
            'median_latency_ms': statistics.median(lat) if lat else None,
            'mean_latency_ms': statistics.mean(lat) if lat else None,
            'mean_verification_cost': statistics.mean(ver) if ver else None,
        }

    return {
        'schema': 'chatgpt.reasoning.learning-summary.v1',
        'run_count': len(runs),
        'product_outcomes': dict(sorted(product.items())),
        'procedure_outcomes': dict(sorted(procedure.items())),
        'actors': actors,
        'reusable_rules': [{'rule': k, 'observations': v} for k, v in sorted(rules.items(), key=lambda x: (-x[1], x[0]))],
        'negative_rules': [{'rule': k, 'observations': v} for k, v in sorted(negative_rules.items(), key=lambda x: (-x[1], x[0]))],
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
