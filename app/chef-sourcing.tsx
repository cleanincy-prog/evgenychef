import { siteImages } from "./site-images";

/* eslint-disable @next/next/no-img-element -- the approved portrait keeps its full original composition */

const products = [
  {
    name: "Мясо",
    description: "За ягнёнком еду в Лофу — выбираю мясо под блюдо, которое задумал.",
  },
  {
    name: "Рыба и морепродукты",
    description: "За свежей рыбой еду в Зиги. Рыбу и морепродукты выбираю с особым вниманием к свежести и качеству.",
  },
  {
    name: "Овощи и фрукты",
    description: "За сезонными овощами и фруктами — к фермерам, за спелой клубникой — на клубничную ферму.",
  },
];

export default function ChefSourcing() {
  return <section className="sourcing-signature" id="products" aria-labelledby="sourcing-title">
    <header className="sourcing-heading">
      <p className="sourcing-kicker">Профессия в деталях</p>
      <h2 id="sourcing-title"><span>Почерк шефа </span><span>начинается с выбора.</span></h2>
    </header>
    <div className="sourcing-layout">
      <figure className="sourcing-art">
        <img {...siteImages["chef-landscape"]}
          sizes="(max-width: 560px) min(90.5vw, 330px), (max-width: 780px) min(90.5vw, 400px), (max-width: 1440px) min(47vw, 490px), min(34vw, 735px)"
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
        <p className="sourcing-ending">Знать продукт. Выбирать самому.</p>
      </div>
    </div>
  </section>;
}
