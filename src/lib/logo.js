// Drop your logo in src/assets as logo.png, logo.webp or logo.svg (transparent background).
// If several exist, png wins over webp, and webp over svg, so you never have to delete the placeholder.
const found = import.meta.glob('../assets/logo.{png,webp,svg}', { eager: true, import: 'default' });

export const logoUrl = ['png', 'webp', 'svg']
  .map((ext) => found[`../assets/logo.${ext}`])
  .find(Boolean);
