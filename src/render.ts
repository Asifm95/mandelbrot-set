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
        const [h, s, v] = getColor(mandelbrot(x, y));
        p.colorMode('hsb');
        p.stroke(h, s, v);
        p.point(j, i);
      }
    }
  };

  const getColor = (n: number): [number, number, number] => {
    if (isNaN(n)) n = 100;
    const [hue, saturation] = [360 * (n / maxItration), 100];
    const value = n < maxItration ? 100 : 0;
    return [hue, saturation, value];
  };
};

new p5(sketch);
