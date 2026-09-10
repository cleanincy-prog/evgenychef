/* eslint-disable @next/next/no-img-element -- local images retain their complete editorial composition */

type MasterclassesSectionProps = {
  id?: string;
  title: string;
  description: string;
  src: string;
  width: number;
  height: number;
  alt: string;
};

const techniques = ["Нарезка", "Замес", "Лепка", "Соусы", "Обжарка", "Подача"];
const techniqueScene = "/media/event-formats/masterclasses-six-stages-paper-v2.webp";
const compactGroups = [
  {
    key: "preparation",
    start: 1,
    labels: techniques.slice(0, 3),
    alt: "Иллюстрация приёмов на светлом фоне: нож и нарезанные овощи, тесто со скребком, равиоли с начинкой.",
  },
  {
    key: "finishing",
    start: 4,
    labels: techniques.slice(3),
    alt: "Иллюстрация приёмов на светлом фоне: соус с венчиком, сковорода с обжаренным гребешком и тарелка, на которой пинцетом завершают подачу.",
  },
];

export default function MasterclassesSection({
  id = "masterclasses",
  title,
  description,
  src,
  width,
  height,
  alt,
}: MasterclassesSectionProps) {
  return (
    <section className="masterclasses-section" id={id} aria-labelledby={`${id}-title`}>
      <div className="masterclasses-header">
        <div className="masterclasses-copy">
          <span className="masterclasses-number" aria-hidden="true">03</span>
          <h3 id={`${id}-title`}>{title}</h3>
          <p>{description}</p>
        </div>
        <figure className="masterclasses-photo">
          <img src={src} width={width} height={height} loading="lazy" decoding="async" alt={alt} />
        </figure>
      </div>

      <div className="masterclasses-stages">
        <figure className="masterclasses-composition masterclasses-composition-wide">
          <img
            src={techniqueScene}
            width="2071"
            height="759"
            loading="lazy"
            decoding="async"
            alt="Иллюстрация приёмов на светлом фоне: нож и нарезанные овощи, тесто со скребком, равиоли с начинкой, соус с венчиком, сковорода с обжаренным гребешком и тарелка, на которой пинцетом завершают подачу."
          />
          <figcaption>
            <ol className="masterclasses-techniques">
              {techniques.map((technique) => <li key={technique}>{technique}</li>)}
            </ol>
          </figcaption>
        </figure>
        <div className="masterclasses-compact">
          {compactGroups.map((group) => (
            <figure
              className={`masterclasses-composition masterclasses-composition-${group.key}`}
              key={group.key}
            >
              {/* Two continuous apertures reuse one cached scene without editing its subjects. */}
              <div className="masterclasses-stage-aperture">
                <img
                  src={techniqueScene}
                  width="2071"
                  height="759"
                  loading="lazy"
                  decoding="async"
                  alt={group.alt}
                />
              </div>
              <figcaption>
                <ol className="masterclasses-techniques" start={group.start}>
                  {group.labels.map((technique) => <li key={technique}>{technique}</li>)}
                </ol>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
