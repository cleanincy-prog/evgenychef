#!/usr/bin/env python3
"""Reproduce evgenychef.com fonts from pinned official sources.

python3 -m venv /private/tmp/chef-font-tools
/private/tmp/chef-font-tools/bin/pip install fonttools==4.61.1 brotli==1.2.0 zopfli==0.4.3
/private/tmp/chef-font-tools/bin/python scripts/build-role-fonts.py --root /private/tmp/chef-font-assets

Output: fonts/, licenses/, manifest.json. Existing downloads are hash-checked.
IBM Plex Mono is redistributed as unchanged official Google Fonts WOFF2 subsets,
preserving IBM's Reserved Font Name; it is intentionally not locally subsetted.
"""

import argparse
import hashlib
import json
from pathlib import Path
from urllib.request import urlopen

from fontTools import subset
from fontTools.ttLib import TTFont

GOOGLE_FONTS_SHA = "809e4d8b8d7e9364a914909bb777679606c178b8"
IBM_PLEX_SHA = "bf260093582f04622aacc1e9f9ca604d7ccd0c42"
BASE = f"https://raw.githubusercontent.com/google/fonts/{GOOGLE_FONTS_SHA}/ofl"
UNICODES = {
    "cyrillic": "U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116",
    "latin": "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD",
}
LAYOUT_FEATURES = "kern,liga,tnum,lnum,locl,ccmp,mark,mkmk"
SOURCES = [
    ("sources/Spectral-Regular.ttf", f"{BASE}/spectral/Spectral-Regular.ttf", "c89021dc20720c8d0dcf40b0b2f6e00c13665fa8041717f581396f51b8c78f5d"),
    ("sources/Spectral-Medium.ttf", f"{BASE}/spectral/Spectral-Medium.ttf", "f385bc588599c879112272711d4acecc126674009d747a27284f59e93a240e83"),
    ("sources/Spectral-Italic.ttf", f"{BASE}/spectral/Spectral-Italic.ttf", "7ec97244259db4008c4b1224c7914e5371c797c0044af9d85c2d761ba0e5f787"),
    ("sources/GolosText-wght.ttf", f"{BASE}/golostext/GolosText%5Bwght%5D.ttf", "17bb58fb69aec2dfb047a2ebf52534023e9b688c97a6b7ac795b0a72912c2063"),
    ("licenses/SPECTRAL-OFL.txt", f"{BASE}/spectral/OFL.txt", "501d6ceca8e552630fe3aa9442b9a818565680a1a2f79f3fb8c13d6f309a9e98"),
    ("licenses/GOLOS-TEXT-OFL.txt", f"{BASE}/golostext/OFL.txt", "ff532f9e8789f09a9fdffc3c0954eedfb0a48be77b2e2eb90f5f82e4f347f50c"),
    ("licenses/IBM-PLEX-MONO-OFL.txt", f"https://raw.githubusercontent.com/IBM/plex/{IBM_PLEX_SHA}/LICENSE.txt", "7e6b2818edbd8f6a01ae80641cc8f16a51080d08fb4e532be3a0b6f74adb07da"),
    ("fonts/ibm-plex-mono-400-cyrillic.woff2", "https://fonts.gstatic.com/s/ibmplexmono/v20/-F63fjptAgt5VM-kVkqdyU8n1isq131nj-otFQ.woff2", "7b59d6bf7f8b8408ac28f27d01dca9a890abeae77045d343b1d8ccb089a92e54"),
    ("fonts/ibm-plex-mono-400-latin.woff2", "https://fonts.gstatic.com/s/ibmplexmono/v20/-F63fjptAgt5VM-kVkqdyU8n1i8q131nj-o.woff2", "c36f509c0a8f9f85f29cb44bc8701d8a9e0b14c499e77a884f789ead7093a7ac"),
]
FACES = [
    ("Spectral-Regular.ttf", "spectral-400"),
    ("Spectral-Medium.ttf", "spectral-500"),
    ("Spectral-Italic.ttf", "spectral-400-italic"),
    ("GolosText-wght.ttf", "golos-text-400-900"),
]


def sha256(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def parse_range(value):
    result = set()
    for part in value.replace("U+", "").split(","):
        bounds = part.split("-")
        start = int(bounds[0], 16)
        end = int(bounds[-1], 16)
        result.update(range(start, end + 1))
    return result


def compact_range(values):
    values = sorted(values)
    ranges = []
    if not values:
        return ""
    start = previous = values[0]
    for value in values[1:] + [None]:
        if value is not None and value == previous + 1:
            previous = value
            continue
        ranges.append(f"U+{start:04X}" if start == previous else f"U+{start:04X}-{previous:04X}")
        start = previous = value
    return ",".join(ranges)


def inspect(path):
    font = TTFont(path)
    cmap = font.getBestCmap()
    subset_name = "cyrillic" if "cyrillic" in path.name else "latin"
    target = parse_range(UNICODES[subset_name])
    digits = {str(n): font["hmtx"].metrics[cmap[48 + n]][0] for n in range(10) if 48 + n in cmap}
    return {
        "file": f"fonts/{path.name}",
        "bytes": path.stat().st_size,
        "sha256": sha256(path),
        "family": font["name"].getDebugName(1),
        "subfamily": font["name"].getDebugName(2),
        "postscript_name": font["name"].getDebugName(6),
        "weight": font["OS/2"].usWeightClass,
        "italic_angle": font["post"].italicAngle,
        "axes": [{"tag": axis.axisTag, "min": axis.minValue, "default": axis.defaultValue, "max": axis.maxValue} for axis in font["fvar"].axes] if "fvar" in font else [],
        "cmap_count": len(cmap),
        "cmap_unicode_ranges": compact_range(cmap),
        "css_unicode_range": UNICODES[subset_name],
        "requested_codepoints_absent": compact_range(target - set(cmap)),
        "extra_codepoints": compact_range(set(cmap) - target),
        "russian_letters_complete": all(cp in cmap for cp in [*range(0x410, 0x450), 0x401, 0x451]) if subset_name == "cyrillic" else None,
        "numero_sign": 0x2116 in cmap,
        "digit_advance_widths": digits,
        "layout_features": {tag: sorted({r.FeatureTag for r in font[tag].table.FeatureList.FeatureRecord}) for tag in ("GSUB", "GPOS") if tag in font and font[tag].table.FeatureList},
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parent)
    args = parser.parse_args()
    root = args.root
    for rel, url, expected in SOURCES:
        path = root / rel
        path.parent.mkdir(parents=True, exist_ok=True)
        if not path.exists():
            with urlopen(url) as response:
                path.write_bytes(response.read())
        actual = sha256(path)
        if actual != expected:
            raise ValueError(f"Source checksum mismatch: {rel}; expected {expected}; got {actual}")
    for source, prefix in FACES:
        for name, codepoints in UNICODES.items():
            out = root / "fonts" / f"{prefix}-{name}.woff2"
            subset.main([
                str(root / "sources" / source),
                f"--unicodes={codepoints}",
                f"--layout-features={LAYOUT_FEATURES}",
                "--name-IDs=*", "--name-languages=*",
                "--no-recalc-timestamp", "--canonical-order",
                "--flavor=woff2", f"--output-file={out}",
            ])
            expected_codepoints = set(TTFont(root / "sources" / source).getBestCmap()) & parse_range(codepoints)
            actual_codepoints = set(TTFont(out).getBestCmap())
            if actual_codepoints != expected_codepoints:
                raise ValueError(f"Subset changed available requested Unicode coverage: {out.name}")
    manifest = {
        "google_fonts_commit": GOOGLE_FONTS_SHA,
        "ibm_plex_license_commit": IBM_PLEX_SHA,
        "tools": {"fonttools": "4.61.1", "brotli": "1.2.0", "zopfli": "0.4.3"},
        "layout_features": LAYOUT_FEATURES,
        "notes": [
            "Spectral and Golos use exactly the user-requested Unicode ranges. Missing entries are absent in the official source, typically controls or unsupported symbols, not removed requested glyphs.",
            "Shaping features ccmp/mark/mkmk preserve combining accents; lnum preserves requested lining figures in addition to kern/liga/tnum/locl.",
            "Golos Text upstream is already variable wght 400-900, so no instancing or axis trimming is needed.",
            "IBM Plex Mono WOFF2 files are unchanged official Google Fonts v20 subsets. Do not re-subset them under the reserved name Plex.",
            "IBM's official WOFF2 cmap includes a few additional glyphs and combining marks; see each output's extra_codepoints. CSS ranges remain limited to the requested scheme.",
        ],
        "sources": [{"file": path, "url": url, "sha256": digest} for path, url, digest in SOURCES],
        "outputs": [inspect(path) for path in sorted((root / "fonts").glob("*.woff2"))],
    }
    (root / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n")
    for row in manifest["outputs"]:
        print(f"{row['file']}: {row['bytes']} bytes; weight {row['weight']}; italic {row['italic_angle']}; cmap {row['cmap_count']}")


if __name__ == "__main__":
    main()
