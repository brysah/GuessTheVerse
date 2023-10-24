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

function randomNumber(max) {
    const number = Math.floor(Math.random() * max);
    return number;
}


const apiKey = '8d7ad2534c36083b8838852b8facb582';
const artistName = 'justin bieber';
const apiUrl = `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_artist=${artistName}&f_has_lyrics=true&s_track_rating=desc&page_size=1&page=1&apikey=${apiKey}`;



fetch(apiUrl)
    .then(response => response.json())
    .then(data => { 
        const i = randomNumber(1); 
        console.log(i);
        console.log(data.message.body.track_list[i]);
        const track_id = data.message.body.track_list[i].track.track_id;
        const newApi = `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${track_id}&apikey=${apiKey}`; 

        return fetch(newApi)
            .then(response => response.json())
            .then(data => { 
                console.log(data);
                const arrLyrics = data.message.body.lyrics.lyrics_body;
                const n = arrLyrics.split('\n');
                let lyric = n[0]+'\n'+n[1]+'\n'+n[2];
                lyrics.textContent = lyric;
            });
    })
    .catch(error => console.error('Error:', error));

