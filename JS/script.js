import { monuments } from '../JS/monument.js';

const welcomePage = document.querySelector('.welcome-page');
const gameContainer = document.querySelector('.game-container');
const monumentImage = document.querySelector('.monument-image');
const option1 = document.getElementById('option1');
const option2 = document.getElementById('option2');
const feedbackMessage = document.querySelector('.feedback-message');
const nextButton = document.querySelector('.next-button');
const startButton = document.querySelector('.start-button');
const nextQuestionButton = document.querySelector('.next-question-button');


let currentMonumentIndex = 0;
let xOrientation = null;
let tiltThreshold = 15;
let gameStarted = false; // Variabele toegevoegd om het spel te volgen

window.addEventListener('deviceorientation', handleOrientation);
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', showNextMonument);
nextQuestionButton.addEventListener('click', showNextMonument);

function startGame() {
    welcomePage.style.display = 'none';
    gameContainer.style.display = 'block';
    showMonument();
    gameStarted = true; // Markeer het spel als gestart
}

function handleOrientation(event) {
    // Controleer of het spel is gestart voordat de oriëntatie wordt verwerkt
    if (!gameStarted) {
        return;
    }

    if (event.beta !== null) {
        xOrientation = event.beta;
    }

    if (xOrientation !== null) {
        if (xOrientation > tiltThreshold) {
            checkAnswer(0); // Optie 1
        } else if (xOrientation < -tiltThreshold) {
            checkAnswer(1); // Optie 2
        }
    }
}

function showMonument() {
    const currentMonument = monuments[currentMonumentIndex];
    monumentImage.src = currentMonument.image;

    option1.textContent = currentMonument.countries[0];
    option2.textContent = currentMonument.countries[1];

    feedbackMessage.textContent = ''; // Reset het feedbackbericht
    nextButton.style.display = 'none'; // Verberg de knop voor het volgende monument
}

function checkAnswer(selectedOption) {
    const currentMonument = monuments[currentMonumentIndex];
    if (selectedOption === currentMonument.correctAnswer) {
        feedbackMessage.textContent = 'Good job!';
        feedbackMessage.style.color = 'green'; // Stel de tekstkleur in op groen
    } else {
        feedbackMessage.textContent = 'Wrong!';
        feedbackMessage.style.color = 'red'; // Stel de tekstkleur in op rood
    }
    setTimeout(() => {
        feedbackMessage.textContent = ''; // Reset het feedbackbericht
        if (selectedOption === currentMonument.correctAnswer) {
            showInfoPage(currentMonument.info);
        } else {
            showInfoPage(currentMonument.info);
        }
    }, 1000); // Na 1 seconde doorgaan naar de informatiepagina
}


function showInfoPage(info) {
    gameContainer.style.display = 'none'; // Verberg het spelcontainer
    document.querySelector('.monument-info').textContent = info;
    document.querySelector('.info-page').style.display = 'block'; // Toon de info-pagina
}

function showNextMonument() {
    document.querySelector('.info-page').style.display = 'none'; // Verberg de info-pagina
    gameContainer.style.display = 'block'; // Toon het spelcontainer
    currentMonumentIndex++;
    if (currentMonumentIndex >= monuments.length) {
        currentMonumentIndex = 0;
    }
    showMonument();
}
