const canvas = document.querySelector('canvas'),
toolBtns = document.querySelectorAll('.tool'),
fillColor = document.querySelector('#fill-color'),
sizeSlider = document.querySelector('#size-slider'),
colorBtns = document.querySelectorAll('.colors .option'),
colorPicker = document.querySelector('#color-picker'),
ctx = canvas.getContext('2d');

let prevMouseX, prevMouseY, snapshot,
isDrawing = false,
selectedTool = 'brush',
brushWidth = 5,
selectedColor = '#000000';

window.addEventListener('load', () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
});

const drawRect = (event) => {
  if (!fillColor.checked) {
    return ctx.strokeRect(event.offsetX, event.offsetY, prevMouseX - event.offsetX, prevMouseY - event.offsetY);
  }

  ctx.fillRect(event.offsetX, event.offsetY, prevMouseX - event.offsetX, prevMouseY - event.offsetY);
}

const drawCircle = (event) => {
  ctx.beginPath();
  let radius = Math.sqrt(Math.pow((prevMouseX - event.offsetX), 2) + Math.pow((prevMouseY - event.offsetY), 2));
  ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
  fillColor.checked ? ctx.fill() : ctx.stroke();
};

const drawTriangle = (event) => {
  ctx.beginPath();
  ctx.moveTo(prevMouseX, prevMouseY);
  ctx.lineTo(event.offsetX, event.offsetY);
  ctx.lineTo(prevMouseX * 2 - event.offsetX, event.offsetY);
  ctx.closePath();
  fillColor.checked ? ctx.fill() : ctx.stroke();
};

const startDraw = (event) => {
  isDrawing = true;
  prevMouseX = event.offsetX;
  prevMouseY = event.offsetY;
  ctx.beginPath();
  ctx.lineWidth = brushWidth;
  ctx.strokeStyle = selectedColor;
  ctx.fillStyle = selectedColor;
  snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
};

const drawing = (event) => {
  if (!isDrawing) return;
  ctx.putImageData(snapshot, 0, 0);

  if (selectedTool === 'brush') {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
  } else if (selectedTool === 'rectangle') {
    drawRect(event);
  } else if (selectedTool === 'circle') {
    drawCircle(event);
  } else {
    drawTriangle(event);
  };
};

toolBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.options .active').classList.remove('active');
    btn.classList.add('active');
    selectedTool = btn.id;
  });
});

sizeSlider.addEventListener('change', () => brushWidth = sizeSlider.value);

colorBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.options .selected').classList.remove('selected');
    btn.classList.add('selected');
    selectedColor = window.getComputedStyle(btn).getPropertyValue('background-color');
  });
});

colorPicker.addEventListener('change', () => {
  colorPicker.parentElement.style.background = colorPicker.value;
  colorPicker.parentElement.click();
});

canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('mousemove', drawing);
canvas.addEventListener('mouseup', () => isDrawing = false);