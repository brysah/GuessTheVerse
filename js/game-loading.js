import Modal from './modal.js';

document.addEventListener('DOMContentLoaded', function () {
  const icon = document.getElementById('icon');
  const btnHow = document.querySelector('.how-to'); 
  const overlay = document.querySelector('.overlay');
  const modal = Modal({ icon, document });

  icon.addEventListener('mouseover', modal.mouseOver);
  icon.addEventListener('mouseout', modal.mouseOut);
  icon.addEventListener('click', modal.open);
  btnHow.addEventListener('click', modal.open);
  overlay.addEventListener('click', modal.open);

  const playButton = document.querySelector('.btn-play');

  playButton.addEventListener('click', function () {
    window.location.href = 'game-setting.html';

  })

});
