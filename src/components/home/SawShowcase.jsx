const photoOrder = [24, 23, 22, 21, 20, 27, 19, 18, 17, 16, 15];
const modules = import.meta.glob('../../assets/iteam/{15,16,17,18,19,20,21,22,23,24,27}.jpg', {
  eager: true,
  import: 'default',
});

const photos = photoOrder
  .map((number) => ({
    src: modules[`../../assets/iteam/${number}.jpg`],
    alt: `SAW 1.0 event photo ${number}`,
  }))
  .filter((photo) => photo.src);

export default function SawShowcase() {
  const renderPhotos = (duplicate = false) => (
    <div className="pano-group" aria-hidden={duplicate || undefined}>
      {photos.map((photo) => (
        <figure className="pano-item" key={photo.src}>
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

  if (photos.length === 0) return null;

  return (
    <div className="pano event-gallery" role="region" aria-label="SAW 1.0 event photos">
      <div className="pano-track">
        {renderPhotos()}
        {renderPhotos(true)}
      </div>
    </div>
  );
}
