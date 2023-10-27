import Api from './api.js';
import Artist from './artist.js';

const showArtist = document.getElementById('artist');
const artistList = document.getElementById('artistListS');

const api = Api();
let token = await api.getToken();
const artist = Artist({
    token
});

function dataCleaner(data) {
    while (data.firstChild) {
        data.removeChild(data.firstChild);
    }
}

function createOption(element) {
    let option = document.createElement('option');
    option.textContent = element.name;
    option.setAttribute('data-url', element.images[0].url);
    option.setAttribute('data-name', element.name);
    option.setAttribute('data-id', element.id);
    artistList.appendChild(option);
}

showArtist.addEventListener('input', async () => {
    dataCleaner(artistList);
    if (showArtist.value != '') {
        let artistArray = await artist.search(showArtist.value);
        artistArray.forEach(element => {
            createOption(element);
        });
    }

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
        const dataToSend = { imageUrl: url, nameArtist: nameA, id: id, token: token };
        const queryString = `?imageUrl=${dataToSend.imageUrl}&nameArtist=${dataToSend.nameArtist}&id=${dataToSend.id}&token=${dataToSend.token}`;
        localStorage.setItem('points', 0);
        localStorage.setItem('question', 1);
        window.location.href = `game.html${queryString}`;
    } else {
        error.innerHTML = "Invalid artist";
    }
});
