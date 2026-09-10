#!/usr/bin/env python3
"""Read-only comparison with ORIGINAL_INTEGRITY_BASELINE.json.

All git processes run from this copy with git -C ORIGINAL and
GIT_OPTIONAL_LOCKS=0. No original files, Git metadata, or index are written.
Only the JSON report in this copy is written. No file contents are reported.
Exit codes: 0 = baseline matches; 1 = difference; 2 = incomplete check/error.
"""
from __future__ import annotations

import hashlib
import json
import os
from pathlib import Path
import subprocess
import sys
from datetime import datetime, timezone


def timestamp():
    return datetime.now(timezone.utc).isoformat()


def parse_status(raw):
    """Parse porcelain v1 -z, including the second path of rename/copy records."""
    fields = raw.split(b"\0")
    records = []
    index = 0
    while index < len(fields):
        entry = fields[index]
        index += 1
        if not entry:
            continue
        code = entry[:2].decode("ascii", errors="replace")
        record = {"status": code, "path": os.fsdecode(entry[3:])}
        if any(letter in code for letter in ("R", "C")) and index < len(fields):
            record["from_path"] = os.fsdecode(fields[index])
            index += 1
        records.append(record)
    return records


def record_key(record):
    return json.dumps(record, sort_keys=True, ensure_ascii=True)


def main():
    root = Path(__file__).resolve().parent.parent
    baseline_path = root / "ORIGINAL_INTEGRITY_BASELINE.json"
    baseline = json.loads(baseline_path.read_text(encoding="utf-8"))
    if root != Path(baseline["copy"]).resolve():
        raise RuntimeError("Refusing to run outside the baseline's independent copy.")
    original = Path(baseline["original"]).resolve()
    if original == root or original in root.parents or root in original.parents:
        raise RuntimeError("Original and copy must be separate directories.")

    report_path = root / "artifacts/evening-plan-local/original-integrity.json"
    if not report_path.resolve().is_relative_to(root):
        raise RuntimeError("Refusing to write the report outside the copy.")
    report = {
        "started_at": timestamp(),
        "original": str(original),
        "copy": str(root),
        "report": str(report_path),
        "read_only_policy": {
            "git_cwd": str(root),
            "git_original_selection": "git -C ORIGINAL",
            "GIT_OPTIONAL_LOCKS": "0",
            "writes": ["artifacts/evening-plan-local/original-integrity.json"],
            "file_contents_in_report": False,
        },
        "algorithm": "Sort raw git ls-files -z paths by bytes; for each existing file, append raw path bytes then SHA-256(file bytes).digest() to the aggregate SHA-256.",
        "scope": "Tracked file contents and raw Git porcelain v1 -z status. Untracked file contents and Git history are outside this baseline. This is a point-in-time check, not an atomic snapshot.",
        "baseline": {
            "tracked_files": baseline["tracked_files"],
            "sha256": baseline["sha256"],
            "git_status": baseline["git_status"],
        },
        "errors": [],
    }
    env = os.environ.copy()
    for name in ("GIT_DIR", "GIT_WORK_TREE", "GIT_INDEX_FILE",
                 "GIT_OBJECT_DIRECTORY", "GIT_COMMON_DIR"):
        env.pop(name, None)
    env["GIT_OPTIONAL_LOCKS"] = "0"

    def git(*args):
        result = subprocess.run(
            ["git", "-C", str(original), *args],
            cwd=str(root), env=env, stdout=subprocess.PIPE,
            stderr=subprocess.PIPE, check=False,
        )
        if result.returncode:
            raise RuntimeError("Read-only git command failed: " + " ".join(args)
                               + " (exit " + str(result.returncode) + ")")
        return result.stdout

    exit_code = 2
    try:
        paths = sorted(path for path in git("ls-files", "-z").split(b"\0") if path)
        aggregate = hashlib.sha256()
        count = 0
        missing = []
        changed_during_read = []
        original_bytes = os.fsencode(original)
        for raw_path in paths:
            filename = os.path.join(original_bytes, raw_path)
            if not os.path.exists(filename):
                missing.append(os.fsdecode(raw_path))
                continue
            try:
                before = os.stat(filename)
                file_hash = hashlib.sha256()
                with open(filename, "rb") as handle:
                    for block in iter(lambda: handle.read(1024 * 1024), b""):
                        file_hash.update(block)
                after = os.stat(filename)
                if (before.st_size, before.st_mtime_ns, before.st_ino) != (
                    after.st_size, after.st_mtime_ns, after.st_ino
                ):
                    changed_during_read.append(os.fsdecode(raw_path))
                aggregate.update(raw_path)
                aggregate.update(file_hash.digest())
                count += 1
            except OSError as error:
                report["errors"].append({
                    "path": os.fsdecode(raw_path),
                    "error": type(error).__name__,
                })
        current_status = git("status", "--porcelain=v1", "-z")
        baseline_status = baseline["git_status"].encode("utf-8", errors="surrogateescape")
        current_records = parse_status(current_status)
        baseline_records = parse_status(baseline_status)
        current_map = {record_key(item): item for item in current_records}
        baseline_map = {record_key(item): item for item in baseline_records}
        digest = aggregate.hexdigest()
        checks = {
            "tracked_file_count_matches": count == baseline["tracked_files"],
            "tracked_content_hash_matches": digest == baseline["sha256"],
            "raw_git_status_matches": current_status == baseline_status,
            "read_complete": not report["errors"] and not changed_during_read,
        }
        report["current"] = {
            "tracked_paths_listed": len(paths),
            "tracked_files": count,
            "sha256": digest,
            "git_status": current_status.decode("utf-8", errors="surrogateescape"),
            "status_records": current_records,
            "missing_tracked_paths": missing,
            "paths_changed_during_read": changed_during_read,
        }
        report["comparison"] = checks
        report["baseline_matches"] = all(checks.values())
        report["path_evidence"] = {
            "status_records_added_since_baseline": [
                current_map[key] for key in sorted(current_map.keys() - baseline_map.keys())
            ],
            "status_records_removed_since_baseline": [
                baseline_map[key] for key in sorted(baseline_map.keys() - current_map.keys())
            ],
            "limitation": "Baseline stores one aggregate content hash, not per-file hashes. If the aggregate differs, exact content differences cannot be located from it. Status deltas are evidence of status changes only; a file may change while retaining the same dirty status.",
        }
        exit_code = 0 if report["baseline_matches"] else (1 if checks["read_complete"] else 2)
    except Exception as error:
        report["errors"].append({"error": type(error).__name__, "message": str(error)})
        report["baseline_matches"] = False
    report["finished_at"] = timestamp()
    report["exit_code"] = exit_code
    report_path.parent.mkdir(parents=True, exist_ok=True)
    report_path.write_text(json.dumps(report, indent=2, ensure_ascii=True) + "\n", encoding="utf-8")
    print(json.dumps({
        "report": str(report_path),
        "baseline_matches": report["baseline_matches"],
        "comparison": report.get("comparison"),
        "current_sha256": report.get("current", {}).get("sha256"),
        "tracked_files": report.get("current", {}).get("tracked_files"),
        "exit_code": exit_code,
    }, ensure_ascii=False))
    return exit_code


if __name__ == "__main__":
    try:
        sys.exit(main())
    except Exception as error:
        print(type(error).__name__ + ": " + str(error), file=sys.stderr)
        sys.exit(2)
