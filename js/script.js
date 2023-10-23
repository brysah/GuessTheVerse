document.addEventListener('DOMContentLoaded', function () {
  const clientId = 'a805786e12bc4445bf91f3b71f6012d6';
  const clientSecret = 'cca4e0976449496ea2e3bd97af1701db';
  const tokenUrl = 'https://accounts.spotify.com/api/token';
  let token = null;

  const authOptions = {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  };

  function geraToken() {
    fetch(tokenUrl, authOptions)
      .then(response => response.json())
      .then(data => {
        token = data.access_token;
      })
      .catch(error => console.error('Erro ao obter token de acesso:', error));
  }

  geraToken();
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

  function dataCleaner(data) {
    while (data.firstChild) {
      data.removeChild(data.firstChild);
    }
  }

  playButton.addEventListener('click', function () {
    fetch('../game-setting.html')
      .then(response => response.text())
      .then(data => {
        bodyPage.innerHTML = data;
        const searchArtists = document.getElementById('artist');
        const artistList = document.getElementById('artistList');
        return searchArtists;
      })
      .then(response => {
        response.addEventListener('input', () => {
          dataCleaner(artistList);
          let apiUrl = `https://api.spotify.com/v1/search?q=${response.value}&type=artist&limit=5`;

          fetch(apiUrl, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
            .then(response => response.json())
            .then(data => {
              dataCleaner(artistList);
              data.artists.items.forEach(element => {
                let option = document.createElement('option');
                option.value = element.name;
                artistList.appendChild(option);
                console.log(element);
              });
            })
            .catch(error => console.error('Erro:', error));
        });
      })
      .catch(error => console.error('Error:', error));
  });






});
