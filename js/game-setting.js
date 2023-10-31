import Artist from './artist.js';

const showArtist = document.getElementById('artist');
const artistList = document.getElementById('artistList');
const submitButton = document.getElementById('submit-play');
const error = document.querySelector(".error");

const artist = Artist({
    name:null,
    id:null,
    imageUrl:null,
});

function dataCleaner(data) {
    while (data.firstChild) {
        data.removeChild(data.firstChild);
    }
}

function createOption(element) {
    let option = document.createElement('option');
    option.textContent = element.name;   
    let artistOption = Artist({
        name: element.name,
        id: element.id,
        imageUrl: element.images[1].url 
    });
    option.setAttribute('info',JSON.stringify(artistOption));
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

submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    const selectedOptionText = showArtist.value;
    const selectedOption = [...artistList.options].find(option => option.textContent === selectedOptionText);

    if (selectedOption) {        
        error.innerHTML = "";   
        console.log(selectedOption);
        localStorage.setItem('points', 0);
        localStorage.setItem('question', 1); 
        localStorage.setItem('artist',selectedOption.getAttribute('info'));
        localStorage.setItem('prevSongs','');
        window.location.href = `game.html`;
    } else {
        error.innerHTML = "Invalid artist";
    }
});
