const canvas = document.querySelector('canvas');
ctx = canvas.getContext('2d');

let isDrawing = false;

window.addEventListener('load', () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
});

const startDraw = () => {
  //soon
};

const drawing = (event) => {
  if (!isDrawing) return;
  ctx.lineTo(event.offsetX, event.offsetY);
  ctx.stroke();
};

canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('mousemove', drawing);