import { siteImages } from "./site-images";

/* eslint-disable @next/next/no-img-element -- the approved portrait keeps its full original composition */

const products = [
  {
    name: "Мясо",
    description: "За ягнёнком еду в Лофу. Выбираю мясо под блюдо, которое задумал.",
  },
  {
    name: "Рыба и морепродукты",
    description: "За рыбой еду в рыбацкую деревню Зиги. Рыбу и морепродукты выбираю по свежести и качеству.",
  },
  {
    name: "Овощи и фрукты",
    description: "За сезонными овощами и фруктами езжу к фермерам. За спелой клубникой — на клубничную ферму.",
  },
];

export default function ChefSourcing() {
  return <section className="sourcing-signature" id="products" aria-labelledby="sourcing-title">
    <header className="sourcing-heading">
      <h2 id="sourcing-title">Магия начинается с выбора.</h2>
    </header>
    <div className="sourcing-layout">
      <figure className="sourcing-art">
        <img {...siteImages["chef-landscape"]}
          sizes="(max-width: 780px) min(40vw, 272px), (max-width: 1440px) 368px, 552px"
          alt="Карандашный портрет Евгения: в силуэте плеч соединены горная деревня, рыбацкая гавань и клубничные грядки"
          loading="lazy" decoding="async" />
      </figure>
      <div className="sourcing-copy">
        <p className="sourcing-intro">Выбор продукта — такая же часть моей работы, как приготовление. Свежесть и качество мяса, рыбы и морепродуктов задают вкус задолго до того, как я начинаю готовить.</p>
        <ol className="sourcing-products">
          {products.map((product, index) => <li className="sourcing-product" key={product.name}>
            <span className="sourcing-number" aria-hidden="true">0{index + 1}</span>
            <div><h3>{product.name}</h3><p>{product.description}</p></div>
          </li>)}
        </ol>
      </div>
    </div>
  </section>;
}
