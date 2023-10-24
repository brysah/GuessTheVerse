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
                if (element.popularity > 0) {
                  let option = document.createElement('option');
                  option.textContent = element.name;
                  option.setAttribute('data-value', element.id);
                  artistList.appendChild(option);
                  //console.log(element);
                }
              });
            })
            .catch(error => console.error('Erro:', error));

        });

        const submitButton = document.getElementById('submit-play');
        submitButton.addEventListener('click', (e) => {
          e.preventDefault();
          const selectedOptionText = document.getElementById('artist').value;
          const selectedOption = [...document.getElementById('artistList').options].find(option => option.textContent === selectedOptionText);
          const error = document.querySelector(".error");

          if (selectedOption) {
            error.innerHTML = "";
            error.className = "error";
            const id = selectedOption.getAttribute('data-value');
            fetch('../game.html')
              .then(response => response.text())
              .then(data => {
                bodyPage.innerHTML = data;
                const lyrics = document.querySelector('.lyrics');
                const album = document.querySelector('.album');
                const image = document.querySelector('.artist-img');
                
                const options = document.querySelectorAll('.option');
                
                options.forEach(item => {
                  item.addEventListener('click', (e) => {
                    options.forEach(option => {
                      if (option !== e.target) {
                        option.classList.remove('selected');
                      }
                    });
                    e.target.classList.toggle('selected');
                  });
                });
                // image.setAttribute('src',response.getAttribute('data-value'));
                let apiUrl = `https://api.spotify.com/v1/artists/${id}/`;

                fetch(apiUrl, {
                  headers: {
                    'Authorization': `Bearer ${token}`
                  }
                })
                  .then(response => response.json())
                  .then(data => {
                    image.setAttribute('src', data.images[0].url);
                  })
                  .catch(error => console.error('Erro:', error));
              })
          } else {
            error.innerHTML = "Invalid artist";
          }
        });


      })
      .catch(error => console.error('Error:', error));
  });








});
