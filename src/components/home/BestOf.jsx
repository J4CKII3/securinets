const modules = import.meta.glob('../../assets/iteam/{[1-9],1[0-4]}.jpg', {
  eager: true,
  import: 'default',
});

const photos = Object.entries(modules)
  .sort(([a], [b]) => {
    const numberA = Number(a.match(/\/(\d+)\.jpg$/i)[1]);
    const numberB = Number(b.match(/\/(\d+)\.jpg$/i)[1]);
    return numberA - numberB;
  })
  .map(([path, src], index) => ({
    src,
    alt: `Securinets community moment ${index + 1}`,
  }));

const placeholders = Array.from({ length: 6 }, (_, i) => ({
  placeholder: true,
  n: i + 1,
}));

export default function BestOf() {
  const items = photos.length ? photos : placeholders;

  const renderPhotos = (duplicate = false) => (
    <div className="pano-group" aria-hidden={duplicate || undefined}>
      {items.map((item) => (
        <figure className="pano-item" key={item.src || item.n}>
          {item.placeholder ? (
            <div className="pano-ph">
              <p>Photo slot {item.n}</p>
            </div>
          ) : (
            <img
              src={item.src}
              alt={duplicate ? '' : item.alt}
              decoding="async"
              draggable={false}
            />
          )}
        </figure>
      ))}
    </div>
  );

  return (
    <section className="section bestof" aria-labelledby="best-title">
      <div className="container">
        <div className="section-head">
          <h2 id="best-title" className="h2">
            Best of 2025/2026
          </h2>
        </div>
      </div>
      <div className="pano" role="region" aria-label="Best of 2025/2026 photos">
        <div className="pano-track">
          {renderPhotos()}
          {renderPhotos(true)}
        </div>
      </div>
    </section>
  );
}
