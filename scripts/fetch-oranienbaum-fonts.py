#!/usr/bin/env python3
"""Download the approved, unchanged static WOFF2 files and verify their hashes."""

import argparse
import hashlib
import json
from pathlib import Path
from urllib.request import urlopen


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", required=True, type=Path)
    args = parser.parse_args()
    manifest_path = Path(__file__).resolve().parents[1] / "public/fonts/role-fonts-manifest.json"
    manifest = json.loads(manifest_path.read_text())
    args.output.mkdir(parents=True, exist_ok=True)
    for row in manifest["files"] + manifest["licenses"]:
        destination = args.output / row["file"]
        if destination.exists():
            data = destination.read_bytes()
        else:
            with urlopen(row["url"], timeout=30) as response:
                data = response.read()
        if hashlib.sha256(data).hexdigest() != row["sha256"]:
            raise ValueError(f"Checksum mismatch: {row['file']}")
        if not destination.exists():
            destination.write_bytes(data)
        print(f"{row['file']}: {len(data)} bytes, verified")


if __name__ == "__main__":
    main()
