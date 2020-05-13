export const tranformToXY = (
  j: number,
  i: number,
  xCenter: number,
  yCenter: number,
  width: number,
  height: number,
  scale: number
) => [xCenter + (j - width / 2) / scale, yCenter + (-i + height / 2) / scale];
