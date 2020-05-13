import config from './config';
import p5 from 'p5';
import { tranformToXY } from './utils';
import mandelbrot from './mandelbrot';

let scaleFactor = 2;
let xCent = -0.4;
let yCent = 0;
const { width, height, maxItration } = config;
let scale = width < 600 ? 180 : 300;

const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(width, height);
    p.noLoop();
  };

  p.draw = () => drawMandelbrot();

  p.mouseClicked = (e) => zoomMandelbrot();

  const zoomMandelbrot = () => {
    const [j, i] = [p.mouseX, p.mouseY];
    const [_x, _y] = tranformToXY(j, i, xCent, yCent, width, height, scale);
    [xCent, yCent] = [_x, _y];
    scale *= scaleFactor;
    drawMandelbrot();
  };
  const drawMandelbrot = () => {
    console.log('draw', width, height);
    for (let i = 0; i <= height; i++) {
      for (let j = 0; j <= width; j++) {
        const [x, y] = tranformToXY(j, i, xCent, yCent, width, height, scale);
        const [r, g, b] = getColor(mandelbrot(x, y));
        p.stroke(p.color(r, g, b));
        p.point(j, i);
      }
    }
  };

  const getColor = (iterationCount: number): [number, number, number] => {
    if (iterationCount === maxItration) return [0, 0, 0];
    else if (iterationCount <= maxItration / 2)
      return [0, 0, 20 + Math.round(200 / (maxItration / 2)) * iterationCount];
    else
      return [
        Math.round(200 / (maxItration / 2)) *
          (iterationCount - Math.round(maxItration / 2)),
        Math.round(200 / (maxItration / 2)) *
          (iterationCount - Math.round(maxItration / 2)),
        255,
      ];
  };
};

new p5(sketch);
