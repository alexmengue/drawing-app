const canvas = document.querySelector('canvas'),
toolBtns = document.querySelectorAll('.tool'),
ctx = canvas.getContext('2d');

let prevMouseX, prevMouseY,
isDrawing = false,
selectedTool = 'brush',
brushWidth = 5;

window.addEventListener('load', () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
});

const drawRect = (event) => {
  ctx.strokeRect(event.offsetX, event.offsetY, prevMouseX - event.offsetX, prevMouseY - event.offsetY);
}

const startDraw = (event) => {
  isDrawing = true;
  prevMouseX = event.offsetX;
  prevMouseY = event.offsetY;
  ctx.beginPath();
  ctx.lineWidth = brushWidth;
};

const drawing = (event) => {
  if (!isDrawing) return;

  if (selectedTool === 'brush') {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
  } else if (selectedTool === 'rectangle') {
    drawRect(event);
  }
};

toolBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.options .active').classList.remove('active');
    btn.classList.add('active');
    selectedTool = btn.id;
  });
});

canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('mousemove', drawing);
canvas.addEventListener('mouseup', () => isDrawing = false);