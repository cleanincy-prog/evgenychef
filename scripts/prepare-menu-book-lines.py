"""Read the existing studies to derive sparse SVG strokes. Writes no raster images."""
from pathlib import Path
import json
import hashlib
import cv2
import numpy as np

root = Path(__file__).resolve().parent.parent
artwork = json.loads((root/'app/menu-book-art.json').read_text())
result = {}
sources = []
for name, asset in artwork.items():
    source = root/'public'/asset['pencilSrc'].lstrip('/')
    drawing = cv2.imread(str(source), cv2.IMREAD_GRAYSCALE)
    drawing = cv2.resize(drawing, tuple(asset['photoSize']), interpolation=cv2.INTER_AREA)
    result[name] = []
    for part_index, part in enumerate(asset['parts']):
        if (name == 'duck' and part_index in (0,4)) or (name == 'duckOriginal' and part_index in (1,2,3)):
            result[name].append([])
            continue
        x,y,w,h = part['photoRect']
        crop = drawing[round(y):round(y+h),round(x):round(x+w)]
        scale = (410 if part_index == 4 else 250)/max(w,h)
        small = cv2.resize(crop, (round(w*scale),round(h*scale)), interpolation=cv2.INTER_AREA)
        # Large structural edges survive; fine hatching and paper grain do not.
        softened = cv2.GaussianBlur(small, (5,5), 1.3)
        edges = cv2.Canny(softened, 45, 115)
        contours, _ = cv2.findContours(edges, cv2.RETR_LIST, cv2.CHAIN_APPROX_NONE)
        selected = []
        maximum = 34 if part_index == 4 else 19
        min_length = 43 if part_index == 4 else 26
        for contour in sorted(contours, key=lambda c:cv2.arcLength(c,False), reverse=True):
            length = cv2.arcLength(contour,False)
            if length < min_length:
                continue
            points = cv2.approxPolyDP(contour, 1.1, False).reshape(-1,2).astype(float)
            if len(points) < 3:
                continue
            bounds = cv2.boundingRect(contour)
            # Canny sometimes produces a second trace around the same pencil line.
            if any(max(abs(a-b) for a,b in zip(bounds,previous)) < 4 for previous,_,_ in selected):
                continue
            selected.append((bounds, points, length))
            if len(selected) >= maximum:
                break
        # The outer form comes first; shorter internal gestures follow from top to bottom.
        if selected:
            selected = selected[:1] + sorted(selected[1:], key=lambda item:item[0][1]+item[0][0]*.12)
        strokes=[]
        total_length=sum(item[2] for item in selected)
        drawn_length=0
        for _,points,length in selected:
            coords=[(px/scale,py/scale) for px,py in points]
            path=f'M{coords[0][0]:.1f},{coords[0][1]:.1f}'
            for index in range(1,len(coords)-1):
                px,py=coords[index]
                nx,ny=coords[index+1]
                path+=f'Q{px:.1f},{py:.1f} {(px+nx)/2:.1f},{(py+ny)/2:.1f}'
            path+=f'L{coords[-1][0]:.1f},{coords[-1][1]:.1f}'
            strokes.append({'d':path,'start':round(drawn_length/total_length,6),'speed':round(total_length/length,6)})
            drawn_length+=length
        result[name].append(strokes)
    sources.append({'file':asset['pencilSrc'],'sha256':hashlib.sha256(source.read_bytes()).hexdigest()})
(root/'app/menu-book-lines.json').write_text(json.dumps(result,separators=(',',':'))+'\n')
report = {'method':'Sparse source-derived SVG paths: structural contours only, no raster writes or new bitmap generation.', 'sources':sources, 'strokeCounts':{name:[len(parts) for parts in entries] for name,entries in result.items()}}
dest=root/'artifacts/menu-book-scroll-lines-2026-09-13'
dest.mkdir(parents=True,exist_ok=True)
(dest/'line-sources.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(report['strokeCounts']))
