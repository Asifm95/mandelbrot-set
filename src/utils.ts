export const tranformToXY = (
  j: number,
  i: number,
  xCenter: number,
  yCenter: number,
  width: number,
  height: number,
  scale: number
) => [xCenter + (j - width / 2) / scale, yCenter + (-i + height / 2) / scale];

export const renormalizeEscape = (n: number, modulus: number) => {
  const norm = n + 1 - Math.log(Math.log2(modulus));
  return isNaN(norm) ? 100 : norm;
};
