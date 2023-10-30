import Api from './api.js';
export default function Song({
    options,
    lyrics
}) {
    let correctAnswer = undefined;
    let id = undefined;
    const api = Api();

    async function searchLyric(nameSong, artistName) {
        try {
            const apiKey = '8d7ad2534c36083b8838852b8facb582';
            const apiUrl = `http://api.musixmatch.com/ws/1.1/track.search?q_artist=${artistName}&q_track=${nameSong}&f_has_lyrics=true&apikey=${apiKey}&format=jsonp`;

            const script = document.createElement('script');
            script.src = `${apiUrl}&callback=handleResponse`;
            document.body.appendChild(script);
        } catch (error) {
            console.error('Error in searchLyric:', error);
        }
    }

    window.handleResponse = async function (data) {
        try {
            let id;
            let cont = 0;
            while (!id) {
                if (data.message.body.track_list[cont].track.has_lyrics == true) {
                    id = data.message.body.track_list[cont].track.track_id;
                }
                cont++;
            }
            const newApi = `http://api.musixmatch.com/ws/1.1/track.snippet.get?track_id=${id}&apikey=8d7ad2534c36083b8838852b8facb582&format=jsonp`;

            const script = document.createElement('script');
            script.src = `${newApi}&callback=handleLyricResponse`;
            document.body.appendChild(script);
        } catch (error) {
            console.error('Error in handleResponse:', error);
        }
    }

    window.handleLyricResponse = function (data) {
        try {
            const lyric = data.message.body.snippet.snippet_body;
            lyrics.textContent = lyric;
        } catch (error) {
            console.error('Error in handleLyricResponse:', error);
        }
    }

    function randomNumber(max) {
        const number = Math.floor(Math.random() * max);
        return number;
    }

    async function generate(artistId, artistName) {
        try {
            let token = await api.getToken();
            let apiUrl = `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`;
            const response = await fetch(apiUrl, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();

            let prevSongs = localStorage.getItem('prevSongs');
            let cleanPrevSongs = prevSongs.split('|').filter(Boolean);
            let nameSong;
            const numbers = [];
            while (!nameSong) {
                const i = randomNumber(10);
                if (!cleanPrevSongs.includes(data.tracks[i].id)) {
                    nameSong = data.tracks[i].name.replace(/\([^)]*\)/g, '').trim();
                    this.id = data.tracks[i].id;
                    numbers.push(i);
                }
            }

            await searchLyric(nameSong, artistName);
            const positionAnswer = randomNumber(4);
            options[positionAnswer].innerHTML += nameSong;
            options[positionAnswer].setAttribute('isFilled', true);
            this.correctAnswer = nameSong;
            const optionsArray = Array.from(options);

            const unfilledPosition = optionsArray.reduce((positions, option, index) => {
                if (!option.getAttribute('isFilled')) {
                    positions.push(index);
                }
                return positions;
            }, []);

            let j = 0;
            while (numbers.length < 4 && j < unfilledPosition.length) {
                const randomNumber = Math.floor(Math.random() * 10);
                if (!numbers.includes(randomNumber)) {
                    const randomSong = data.tracks[randomNumber].name.replace(/\([^)]*\)/g, '').trim();
                    optionsArray[unfilledPosition[j]].innerHTML += randomSong;
                    numbers.push(randomNumber);
                    j++;
                }
            }


        } catch (error) {
            console.error('Error in generate:', error);
        }
    }


    return {
        searchLyric,
        generate,
        correctAnswer,
        id
    }
}