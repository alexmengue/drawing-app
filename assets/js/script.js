const canvas = document.querySelector('canvas');
const toolBtns = document.querySelectorAll('.tool');
ctx = canvas.getContext('2d');

let isDrawing = false;
let selectedTool = 'brush';
let brushWidth = 5;

window.addEventListener('load', () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
});

const startDraw = () => {
  isDrawing = true;
  ctx.beginPath();
  ctx.lineWidth = brushWidth;
};

const drawing = (event) => {
  if (!isDrawing) return;
  ctx.lineTo(event.offsetX, event.offsetY);
  ctx.stroke();
};

toolBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.options .active').classList.remove('active');
    selectedTool = btn.id;
    btn.classList.add('active');
  });
});

canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('mousemove', drawing);
canvas.addEventListener('mouseup', () => isDrawing = false);