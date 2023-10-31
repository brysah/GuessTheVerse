import Artist from "./artist.js";
import Song from "./song.js";

const artist = Artist(JSON.parse(localStorage.getItem('artist')));

const body = document.querySelector('body');
body.style.minHeight = 'auto';
const questionCount = document.querySelector('.question-count');
const points = document.querySelector('.points');
const lyrics = document.querySelector('.lyrics');
const image = document.querySelector('.artist-img');
const options = document.querySelectorAll('.option');
const nextQuestion = document.querySelector('.next-question');
const p = document.querySelector('.empty-option');
const song = Song({
    options,
    lyrics
});


image.setAttribute('src', artist.imageUrl);  
 

await song.generate(artist.id, artist.name);
let ac = localStorage.getItem('prevSongs');
localStorage.setItem('prevSongs', `${ac}|${song.id}`);
questionCount.innerHTML = `0${localStorage.getItem('question')}/05`;
points.innerHTML = `${localStorage.getItem('points')} points`;

options.forEach(item => {
    item.addEventListener('click', (e) => {
        if (!nextQuestion.classList.contains('active')) nextQuestion.classList.add('active');
        options.forEach(option => {
            if (option !== e.target) {
                option.classList.remove('selected');
            }
        });
        e.target.classList.toggle('selected');
    });
});

nextQuestion.addEventListener('click', () => {
    let answer = 0;
    options.forEach(option => {
        if (option.classList.contains('selected')) {
            answer = option.textContent;
            console.log(answer);
            return;
        }
    });

    if (answer === 0) {
        p.innerHTML = 'Choose an option';
    } else {
        answer = answer.slice(3, answer.length);
        checkAnswer(answer);
        let question = parseInt(localStorage.getItem('question')) + 1;
        if (question <= 5) {
            localStorage.setItem('question', question);
            setTimeout(refresh, 3000);
        } else {
            setTimeout(refresh, 3000);
            localStorage.setItem('question', 0);
            localStorage.setItem('prevSongs', '');
            window.location.href = 'game-result.html';
        }
    }
});

function refresh() {
    location.reload();
}

function checkAnswer() {
    options.forEach(option => {
        let answer = option.innerHTML.slice(3, option.length);
        if (option.classList.contains('selected')) {
            if (song.correctAnswer == answer) {
                option.classList.add('correct');
                let points = parseInt(localStorage.getItem('points')) + 25;
                localStorage.setItem('points', points);
            } else {
                option.classList.add('wrong');
            }

        }
        else {
            if (song.correctAnswer == answer) {
                option.classList.add('correct');
            }
        }
    });
}
