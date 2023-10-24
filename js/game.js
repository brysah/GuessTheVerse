const urlParams = new URLSearchParams(window.location.search);
const imageUrl = urlParams.get('imageUrl'); 
const lyrics = document.querySelector('.lyrics');
const album = document.querySelector('.album');
const image = document.querySelector('.artist-img');
const options = document.querySelectorAll('.option');
image.setAttribute('src', imageUrl);

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


const artistName = 'justin bieber';
const apiKey = '8d7ad2534c36083b8838852b8facb582.'; 
const apiUrl = `https://api.musixmatch.com/ws/1.1/track.search?q_artist=${artistName}&apikey=${apiKey}`;

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => console.error('Error:', error));