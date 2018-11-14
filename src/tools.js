export const createPlayList = (id, name) => ({
  id,
  name,
  songs: []
});

export const deepCopy = o => {
  if (undefined === o) return undefined;
  if (null === o) return null;
  let v;
  const output = Array.isArray(o) ? [] : {};
  Object.keys(o).forEach(key => {
    v = o[key];
    output[key] = typeof v === "object" ? deepCopy(v) : v;
  });
  return output;
};

export const range = (start, end) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
};
