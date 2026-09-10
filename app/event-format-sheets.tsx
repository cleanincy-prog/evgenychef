import type { CSSProperties } from "react";

/* eslint-disable @next/next/no-img-element -- source-directed crops reuse the original local images */

export type EventFormat = {
  id: string;
  kind: "dinner" | "canapes" | "techniques";
  name: string;
  description: string;
  src: string;
  width: number;
  height: number;
  alt: string;
};

type Crop = readonly [x: number, y: number, width: number, height: number];

const dinnerScene = "/media/event-formats/private-dinner-seven-plates-white-v2.png";
const dinnerCrops: Crop[] = [
  [0, 112, 384, 400], [380, 112, 384, 383],
  [760, 112, 384, 390], [1144, 112, 392, 410],
  [130, 534, 350, 366], [512, 502, 455, 447], [1002, 530, 392, 390],
];

// Apertures follow the source objects, not equal tiles that could cut through food.
const canapeCrops: Crop[] = [
  [0, 135, 201, 202], [205, 130, 186, 205], [396, 130, 197, 190],
  [604, 130, 168, 190], [978, 137, 211, 204],
  [1184, 119, 208, 203], [1389, 111, 207, 228], [1605, 122, 169, 214],
  [0, 347, 199, 195], [196, 343, 186, 222], [390, 358, 178, 192],
  [568, 352, 205, 202], [972, 356, 205, 204],
  [1180, 356, 202, 203], [1387, 365, 203, 199], [1597, 352, 177, 195],
  [0, 554, 214, 246], [220, 566, 173, 217], [392, 569, 209, 222],
  [607, 570, 175, 214], [787, 582, 208, 202], [1003, 566, 182, 227],
  [1185, 577, 217, 223], [1402, 574, 205, 245],
];

function SceneCrop({ src, sourceWidth, sourceHeight, crop }: {
  src: string;
  sourceWidth: number;
  sourceHeight: number;
  crop: Crop;
}) {
  const [x, y, width, height] = crop;
  const style = {
    aspectRatio: `${width} / ${height}`,
    "--scene-width": `${sourceWidth / width * 100}%`,
    "--scene-left": `${-x / width * 100}%`,
    "--scene-top": `${-y / height * 100}%`,
  } as CSSProperties;
  return (
    <div className="event-scene-crop" style={style} aria-hidden="true">
      <img src={src} width={sourceWidth} height={sourceHeight} loading="lazy" decoding="async" alt="" />
    </div>
  );
}

function DinnerCourses({ courses }: { courses: readonly string[] }) {
  return (
    <ol className="event-courses" aria-label="Семь подач">
      {courses.map((course, index) => (
        <li key={course}>
          <SceneCrop src={dinnerScene} sourceWidth={1536} sourceHeight={1024} crop={dinnerCrops[index]} />
          <span>{course}</span>
        </li>
      ))}
    </ol>
  );
}

function Canapes() {
  return (
    <figure className="event-canapes" aria-label="Небольшие закуски для свободного общения гостей">
      {canapeCrops.map((crop, index) => (
        <div className="event-canape" key={index}>
          <SceneCrop src="/media/event-formats/private-event-canapes-v3.webp" sourceWidth={1774} sourceHeight={887} crop={crop} />
        </div>
      ))}
    </figure>
  );
}

const techniques = ["Нарезка", "Замес", "Лепка", "Соусы", "Обжарка", "Подача"];
const techniqueScene = "/media/event-formats/masterclasses-six-stages-paper-v2.webp";

function Techniques() {
  return (
    <div className="event-techniques">
      {[techniques.slice(0, 3), techniques.slice(3)].map((group, index) => (
        <figure className={`event-technique-group event-technique-group-${index + 1}`} key={group[0]}>
          <SceneCrop src={techniqueScene} sourceWidth={2071} sourceHeight={759}
            crop={index === 0 ? [0, 0, 1015, 660] : [1015, 0, 1056, 660]} />
          <figcaption>
            <ol start={index * 3 + 1}>
              {group.map((technique) => <li key={technique}>{technique}</li>)}
            </ol>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export default function EventFormatSheets({ formats, courses }: {
  formats: readonly EventFormat[];
  courses: readonly string[];
}) {
  return (
    <ol className="event-sheets">
      {formats.map((format, index) => (
        <li className={`event-sheet event-sheet-${format.kind}`} key={format.id}>
          <section id={format.id} aria-labelledby={`${format.id}-title`}>
            <div className="event-sheet-header">
              <div className="event-sheet-heading">
                <span className="event-sheet-number" aria-hidden="true">0{index + 1}</span>
                <h3 id={`${format.id}-title`}>{format.name}</h3>
              </div>
              <p className="event-sheet-description">{format.description}</p>
              <span className="event-sheet-spine" aria-hidden="true" />
              <figure className="event-sheet-photo">
                <img src={format.src} width={format.width} height={format.height} loading="lazy" decoding="async" alt={format.alt} />
              </figure>
            </div>
            <div className="event-sheet-content">
              {format.kind === "dinner" && <DinnerCourses courses={courses} />}
              {format.kind === "canapes" && <Canapes />}
              {format.kind === "techniques" && <Techniques />}
            </div>
          </section>
        </li>
      ))}
    </ol>
  );
}
