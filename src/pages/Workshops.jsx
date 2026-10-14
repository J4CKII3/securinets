import { useSearchParams } from 'react-router-dom';
import { levels, paths } from '../data/paths.js';

const workshopPhotos = import.meta.glob('../assets/iteam/{100,101,102,103,104,105,106,107}.jpg', {
  eager: true,
  import: 'default',
});

const latestWorkshopPhotos = Object.entries(workshopPhotos)
  .sort(([a], [b]) => {
    const numberA = Number(a.match(/\/(\d+)\.jpg$/)[1]);
    const numberB = Number(b.match(/\/(\d+)\.jpg$/)[1]);
    return numberB - numberA;
  })
  .map(([path, src], index) => ({
    src,
    number: Number(path.match(/\/(\d+)\.jpg$/)[1]),
    alt: `Latest workshop photo ${index + 1}`,
  }));

function LatestWorkshops() {
  const renderPhotos = (duplicate = false) => (
    <div className="pano-group" aria-hidden={duplicate || undefined}>
      {latestWorkshopPhotos.map((photo) => (
        <figure
          className="pano-item"
          id={duplicate ? undefined : `workshop-photo-${photo.number}`}
          key={photo.src}
        >
          <img
            src={photo.src}
            alt={duplicate ? '' : photo.alt}
            loading="eager"
            draggable={false}
          />
        </figure>
      ))}
    </div>
  );

  if (latestWorkshopPhotos.length === 0) return null;

  return (
    <section className="latest-workshops" aria-labelledby="latest-workshops-title">
      <div className="section-head">
        <h2 id="latest-workshops-title" className="h2">
          Latest workshops
        </h2>
      </div>
      <div className="pano" role="region" aria-label="Photos from our latest workshops">
        <div className="pano-track">
          {renderPhotos()}
          {renderPhotos(true)}
        </div>
      </div>
    </section>
  );
}

export default function Workshops() {
  const [params, setParams] = useSearchParams();
  const current = paths.find((p) => p.slug === params.get('path')) ?? paths[0];

  const select = (slug) => setParams({ path: slug }, { replace: true });

  return (
    <div className="container page">
      <header className="page-head">
        <h1>Choose a path and build skills</h1>
        <p>Explore our technical capabilities.</p>
      </header>

      <div className="paths">
        <ul className="path-list" aria-label="Workshop categories">
          {paths.map((p) => (
            <li key={p.slug}>
              <button
                type="button"
                className="path-btn"
                aria-current={p.slug === current.slug}
                onClick={() => select(p.slug)}
              >
                {p.name}
              </button>
            </li>
          ))}
        </ul>

        <article className="path-panel" key={current.slug}>
          <h2>{current.name}</h2>
          <p className="path-summary">{current.summary}</p>

          <h3>What we cover</h3>
          <ol className="steps">
            {current.cover.map((item, i) => (
              <li key={item}>
                <small>{levels[i]}</small>
                <span>{item}</span>
              </li>
            ))}
          </ol>

          <a className="btn btn-primary" href={current.resources[0].url} target="_blank" rel="noopener noreferrer">
            Start learning
          </a>

          <h3 className="resources-title">Recommended resources</h3>
          <ul className="resources">
            {current.resources.map((r) => (
              <li key={r.url}>
                <a href={r.url} target="_blank" rel="noopener noreferrer">
                  <span className="res-name">{r.name}</span>
                  <span className="res-note">{r.note}</span>
                </a>
              </li>
            ))}
          </ul>
        </article>
      </div>

      <LatestWorkshops />
      <p className="note">Only practise on systems you own or have explicit permission to test.</p>
    </div>
  );
}
