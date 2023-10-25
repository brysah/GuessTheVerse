const urlParams = new URLSearchParams(window.location.search);
const imageUrl = urlParams.get('imageUrl');
const id = urlParams.get('id');
const token = urlParams.get('token');
const artistName = urlParams.get('nameArtist');
const lyrics = document.querySelector('.lyrics');
const album = document.querySelector('.album');
const image = document.querySelector('.artist-img');
const options = document.querySelectorAll('.option');

image.setAttribute('src', imageUrl);

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

function randomNumber(max) {
    const number = Math.floor(Math.random() * max);
    return number;
}
 
let apiUrl = `https://api.spotify.com/v1/artists/${id}/top-tracks?market=US`;

fetch(apiUrl, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
})
    .then(response => response.json())
    .then(data => {
        const i = randomNumber(10);
        const nameSong = data.tracks[i].name.replace(/\([^)]*\)/g, '').trim();
        searchLyric(nameSong, artistName);
    })
    .catch(error => console.error('Erro:', error));

function searchLyric(nameSong, artistName) {
    const apiKey = '8d7ad2534c36083b8838852b8facb582';
    const apiUrl = `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_artist=${artistName}&q_track=${nameSong}&f_has_lyrics=true&apikey=${apiKey}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const id = data.message.body.track_list[0].track.track_id;
            const newApi = `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.snippet.get?track_id=${id}&apikey=${apiKey}`;
            fetch(newApi)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    const lyric = data.message.body.snippet.snippet_body;
                    lyrics.textContent = lyric;
                })
        })
        .catch(error => console.error('Error:', error));
}
