export const pad = (n) => String(n).padStart(2, '0');
export const toKey = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`;
export const parseKey = (key) => {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, m - 1, d);
};
export const todayKey = () => {
  const n = new Date();
  return toKey(n.getFullYear(), n.getMonth(), n.getDate());
};
