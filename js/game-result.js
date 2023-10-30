const headline = document.getElementById('headline');
const message = document.getElementById('message');
const score = parseInt(localStorage.getItem('points'));
const playAgain = document.getElementById('play-again');
const body = document.querySelector('body');
body.style.minHeight = 'auto';   

if (score >= 0 && score <= 50){
    headline.innerHTML = 'Nice try!';
    message.innerHTML = "You're just getting started. Keep guessing and you'll get the hang of it! 🎵";
}else if(score > 50 && score <= 75){
    headline.innerHTML = "You're on fire!";
    message.innerHTML = "Great job guessing those verses. Keep it up! 🔥🎶";
}
else if(score > 75 && score <= 100){
    headline.innerHTML = "You're a 'Guesstheverse' pro!";
    message.innerHTML = "You really know your stuff. Can you get a perfect score next time? 🎉🎵";
}
else{
    headline.innerHTML = "Unbelievable! You aced it!";
    message.innerHTML = "You're a 'Guesstheverse' superstar. Can anyone beat your score? 🌟🎤";
}

playAgain.addEventListener('click',()=>{
    
    localStorage.setItem('question',1);
    localStorage.setItem('points',0);
    window.location.href = 'game-setting.html';
});

