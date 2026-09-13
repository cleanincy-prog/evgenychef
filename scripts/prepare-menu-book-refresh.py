"""Encode selected originals and derive SVG display geometry; no raster retouching."""
from pathlib import Path
import hashlib
import json
import cv2
import numpy as np
from PIL import Image

root = Path(__file__).resolve().parent.parent
source = root / 'design/references/menu-photo-refresh-2026-09-13'
dest = root / 'public/media/menu/book'
data_path = root / 'app/menu-book-art.json'
data = json.loads(data_path.read_text())
photo_path = source / 'lamb-natural-photo-atlas.png'
photo = np.asarray(Image.open(photo_path).convert('RGB')).astype(np.int16)
height, width, _ = photo.shape
mask = ((photo.max(axis=2) - photo.min(axis=2)) > 12).astype('uint8')
count, labels, stats, centers = cv2.connectedComponentsWithStats(mask)
anchors = [(245,315), (625,340), (230,750), (610,740)]
masks = [np.zeros((height,width),np.uint8) for _ in range(5)]
for component in range(1,count):
    if stats[component,4] < 18:
        continue
    cx, cy = centers[component]
    group = 4 if cx > 850 or stats[component,4] > 200000 else min(range(4),key=lambda j:(cx-anchors[j][0])**2+(cy-anchors[j][1])**2)
    masks[group][labels == component] = 255
parts = []
for i, boundary in enumerate(masks):
    ys, xs = np.where(boundary > 0)
    x0,y0 = max(0,int(xs.min())-7), max(0,int(ys.min())-7)
    x1,y1 = min(width,int(xs.max())+8), min(height,int(ys.max())+8)
    w,h = x1-x0,y1-y0
    def browser_path(shape, exterior_only=False):
        contours,hierarchy = cv2.findContours(shape,cv2.RETR_CCOMP,cv2.CHAIN_APPROX_SIMPLE)
        paths=[]
        for j,contour in enumerate(contours):
            area = cv2.contourArea(contour)
            parent = hierarchy[0,j,3]
            if area < 8 or (parent >= 0 and (exterior_only or area < 90)):
                continue
            points = cv2.approxPolyDP(contour,.5,True).reshape(-1,2)
            paths.append('M'+'L'.join(f'{(x-x0)/w:.6f},{(y-y0)/h:.6f}' for x,y in points)+'Z')
        return ''.join(paths)
    pencil_boundary = cv2.dilate(boundary,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(11,11)))
    parts.append({'photoRect':[x0,y0,w,h], 'pencilRect':[x0,y0,w,h], 'clipPath':browser_path(boundary, i==4), 'pencilClipPath':browser_path(pencil_boundary, True)})
data['lamb']['parts'] = parts
manifest=[]
duck_pencil = source / 'duck-original-pencil.png'
with Image.open(duck_pencil) as drawing:
    drawing.thumbnail((1200,1200))
    drawing.save(dest/'duck-original-pencil-1200.webp',quality=91)
manifest.append({'file':'duck-original-pencil-1200.webp','source':str(duck_pencil.relative_to(root)),'sourceSha256':hashlib.sha256(duck_pencil.read_bytes()).hexdigest()})
for kind in ['photo','pencil']:
    original = source / f'lamb-natural-{kind}-atlas.png'
    with Image.open(original) as atlas:
        for target_width in [960,1536]:
            output = dest / f'lamb-natural-{kind}-atlas-{target_width}.webp'
            atlas.resize((target_width,round(atlas.height*target_width/atlas.width)),Image.Resampling.LANCZOS).save(output,'WEBP',quality=92 if kind=='photo' else 94,method=6)
            manifest.append({'file':output.name,'source':str(original.relative_to(root)),'sourceSha256':hashlib.sha256(original.read_bytes()).hexdigest()})
    data['lamb'][f'{kind}Src'] = f'/media/menu/book/lamb-natural-{kind}-atlas-960.webp'
    data['lamb'][f'{kind}LargeSrc'] = f'/media/menu/book/lamb-natural-{kind}-atlas-1536.webp'

# These are presentation coordinates on the original photograph, not modified pixels.
full = {'photoRect':[0,0,1800,1665],'pencilRect':[0,0,1800,1665],'clipPath':'M0,0H1V1H0Z','pencilClipPath':'M0,0H1V1H0Z'}
duck_rect = [225,195,514,466]
duck_outline = [(650,211),(692,234),(727,289),(714,346),(671,402),(624,465),(562,527),(493,604),(431,647),(404,650),(356,618),(303,582),(257,545),(235,512),(250,477),(282,439),(326,395),(372,350),(421,308),(476,268),(532,230),(589,209)]
x,y,w,h = duck_rect
duck_clip = 'M'+'L'.join(f'{(px-x)/w:.6f},{(py-y)/h:.6f}' for px,py in duck_outline)+'Z'
duck_crop = {'photoRect':[n*1.875 for n in duck_rect], 'pencilRect':[n*1.875 for n in duck_rect], 'clipPath':duck_clip, 'pencilClipPath':duck_clip}
data['duckOriginal'] = {'photoSrc':'/media/web/duck-plate-960.webp','photoLargeSrc':'/media/menu/personal-menu-duck-plate-cream-v2.webp', 'photoSize':[1800,1665], 'pencilSrc':'/media/menu/book/duck-original-pencil-1200.webp','pencilLargeSrc':'/media/menu/book/duck-original-pencil-1200.webp','pencilSize':[1800,1665],'parts':[duck_crop,full,full,full,full]}
data_path.write_text(json.dumps(data,separators=(',',':'))+'\n')
(dest/'refresh-manifest.json').write_text(json.dumps({'operation':'Proportional resize and WebP encoding only. Original photo pixels retained; SVG clipping is presentation geometry. Octopus assets unchanged.','assets':manifest},indent=2)+'\n')
print(json.dumps({'lambRects':[part['photoRect'] for part in parts],'assets':len(manifest)}))
