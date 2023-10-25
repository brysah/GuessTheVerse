const urlParams = new URLSearchParams(window.location.search);
const imageUrl = urlParams.get('imageUrl');
const id = urlParams.get('id');
const token = urlParams.get('token');
const artistName = urlParams.get('nameArtist');
const lyrics = document.querySelector('.lyrics');
const album = document.querySelector('.album');
const image = document.querySelector('.artist-img');
const options = document.querySelectorAll('.option');
const body = document.querySelector('body');
body.style.minHeight = 'auto';
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
        const numbers = [];
        numbers.push(i);
        searchLyric(nameSong, artistName);
        const positionAnswer = randomNumber(4);
        console.log(positionAnswer);
        options[positionAnswer].innerHTML += nameSong;
        options[positionAnswer].setAttribute('isFilled', true);    
        console.log( options[positionAnswer]); 
        const unfilledPosition = []; 
        for (let position = 0; position < options.length; position++) {
            if (!options[position].getAttribute('isFilled')) {
                unfilledPosition.push(position);
            }
        }
        let j = 0;
        console.log( unfilledPosition);
        while (numbers.length < 4) {
            const randomNumber = Math.floor(Math.random() * 10);
            if (!numbers.includes(randomNumber)) {
                const randomSong = data.tracks[randomNumber].name.replace(/\([^)]*\)/g, '').trim();
                options[unfilledPosition[j]].innerHTML += randomSong;
                numbers.push(randomNumber);
                j++;
            }
        }
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
