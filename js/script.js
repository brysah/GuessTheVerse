document.addEventListener('DOMContentLoaded', function () {
  var icone = document.getElementById('icone');

  icone.addEventListener('mouseover', function () {
    icone.classList.remove('fa-regular');
    icone.classList.add('fa-solid');
  });

  icone.addEventListener('mouseout', function () {
    icone.classList.remove('fa-solid');
    icone.classList.add('fa-regular');
  });

  const btnHow = document.querySelector('.how-to');
  const close = document.querySelector('.icon-close');
  const overlay = document.querySelector('.overlay');

  function openModal() {
    document.documentElement.classList.toggle('modal-opened');
  }

  btnHow.addEventListener('click', openModal);
  overlay.addEventListener('click', openModal);
  close.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  });

  const playButton = document.querySelector('.btn-play');
  const bodyPage = document.querySelector('main');
  
  playButton.addEventListener('click', function () {
    fetch('../game-setting.html')
      .then(response => response.text())
      .then(data => {
        bodyPage.innerHTML = data;
      })
      .catch(error => console.error('Error:', error));
  });

});
