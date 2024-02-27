const canvas = document.querySelector('canvas');
ctx = canvas.getContext('2d');

window.addEventListener('load', () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
});

const drawing = (event) => {
  ctx.lineTo(event.offsetX, event.offsetY);
  ctx.stroke();
};

canvas.addEventListener('mousemove', drawing);

//soon to be