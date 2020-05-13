import config from './config';

const { maxItration } = config;

export default (cX: number, cY: number) => {
  let iter = 0,
    z0X = cX,
    z0Y = cY,
    sqrMagnitude = z0X * z0X + z0Y * z0Y,
    z1X: number,
    z1Y: number;
  while (iter < maxItration && sqrMagnitude <= 4) {
    z1X = z0X * z0X - z0Y * z0Y + cX;
    z1Y = 2 * z0X * z0Y + cY;
    (z0X = z1X), (z0Y = z1Y);
    sqrMagnitude = z0X * z0X + z0Y * z0Y;
    iter++;
  }
  return iter;
};
