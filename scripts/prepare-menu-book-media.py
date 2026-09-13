"""Encode selected artwork for the site; retain all original PNGs and clip geometry."""
from pathlib import Path
from PIL import Image
import hashlib
import json
import shutil

root = Path(__file__).resolve().parent.parent
source = root / 'design/mockups/animated-menu-book-2026-09-13/assets-v2'
dest = root / 'public/media/menu/book'
dest.mkdir(parents=True, exist_ok=True)
data = json.loads((source / 'food-data.js').read_text().removeprefix('window.MENU_BOOK_FOOD=').strip().rstrip(';'))
manifest = []
for name, item in data.items():
    for kind in ['photo', 'pencil']:
        original = source / f'{name}-{kind}-atlas.png'
        with Image.open(original) as atlas:
            for width in [960, 1536]:
                height = round(atlas.height * width / atlas.width)
                output = dest / f'{name}-{kind}-atlas-{width}.webp'
                atlas.resize((width, height), Image.Resampling.LANCZOS).save(output, 'WEBP', quality=92 if kind == 'photo' else 94, method=6)
                manifest.append({'file': output.name, 'width': width, 'height': height, 'bytes': output.stat().st_size, 'source': str(original.relative_to(root)), 'sourceSha256': hashlib.sha256(original.read_bytes()).hexdigest()})
        item[f'{kind}Src'] = f'/media/menu/book/{name}-{kind}-atlas-960.webp'
        item[f'{kind}LargeSrc'] = f'/media/menu/book/{name}-{kind}-atlas-1536.webp'
(root / 'app/menu-book-art.json').write_text(json.dumps(data, separators=(',', ':')) + '\n')
(dest / 'media-manifest.json').write_text(json.dumps({'operation': 'Format conversion and proportional responsive resizing only; original composition, source PNGs and browser clip geometry retained.', 'assets': manifest}, ensure_ascii=False, indent=2) + '\n')
shutil.copy2(source / 'provenance.json', dest / 'provenance.json')
print(json.dumps({'files':len(manifest),'totalBytes':sum(asset['bytes'] for asset in manifest),'originalPNGsUnchanged':True}))
