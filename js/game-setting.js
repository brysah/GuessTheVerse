import Api from './api.js';

const searchArtists = document.getElementById('artist');
const artistList = document.getElementById('artistList');
let token = null;

const api = Api(); 
token = await api.getToken();

function dataCleaner(data) {
    while (data.firstChild) {
        data.removeChild(data.firstChild);
    }
}

searchArtists.addEventListener('input', () => {
    dataCleaner(artistList);
    let apiUrl = `https://api.spotify.com/v1/search?q=${searchArtists.value}&type=artist&limit=5`;
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
                    option.setAttribute('data-url', element.images[0].url);
                    option.setAttribute('data-name', element.name);
                    option.setAttribute('data-id', element.id);
                    artistList.appendChild(option);
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
        console.log(selectedOption.getAttribute('data-name'));
        error.innerHTML = "";
        error.className = "error";
        const url = selectedOption.getAttribute('data-url');
        const id = selectedOption.getAttribute('data-id');
        const nameA = selectedOption.getAttribute('data-name');
        const dataToSend = { imageUrl: url, nameArtist: nameA , id: id, token:token};
        const queryString = `?imageUrl=${dataToSend.imageUrl}&nameArtist=${dataToSend.nameArtist}&id=${dataToSend.id}&token=${dataToSend.token}`;
        localStorage.setItem('points',0);
        localStorage.setItem('question',1);
        window.location.href = `game.html${queryString}`;
    } else { 
        error.innerHTML = "Invalid artist";
    }
});
 