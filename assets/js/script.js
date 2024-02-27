const canvas = document.querySelector('canvas');
ctx = canvas.getContext('2d');

window.addEventListener('load', () => {
  //soon to be
});

const drawing = (event) => {
  ctx.lineTo(event.offsetX, event.offsetY);
  ctx.stroke();
};

canvas.addEventListener('mousemove', drawing);

//soon to be