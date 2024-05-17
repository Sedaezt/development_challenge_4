const welcomePage = document.getElementById('welcome-page');
const gameContainer = document.getElementById('game-container');
const monumentImage = document.getElementById('monument-image');
const option1 = document.getElementById('option1');
const option2 = document.getElementById('option2');
const scoreDisplay = document.getElementById('score');
const feedbackMessage = document.getElementById('feedback-message');
const nextButton = document.getElementById('next-button');
const startButton = document.getElementById('start-button');
const nextQuestionButton = document.getElementById('next-question-button');

const monuments = [
    { image: 'atomium.jpeg', countries: ['België', 'Nederland'], correctAnswer: 0 },
    { image: 'eiffeltoren.jpeg', countries: ['Frankrijk', 'Spanje'], correctAnswer: 0 },
    { image: 'china.jpg', countries: ['Thailand', 'China'], correctAnswer: 1 },
    { image: 'Christus.jpg', countries: ['Brazilië', 'Italië'], correctAnswer: 0 },
    { image: 'Colosseum.jpg', countries: ['Italië', 'Griekenland'], correctAnswer: 0 },
    { image: 'tajMahal.jpeg', countries: ['India', 'Pakistan'], correctAnswer: 0 },
    { image: 'burjKhalifa.jpg', countries: ['Verenigde Arabische Emiraten', 'Saoedi-Arabië'], correctAnswer: 0 },
    { image: 'sagrada.webp', countries: ['Spanje', 'Portugal'], correctAnswer: 0 },
];

let currentMonumentIndex = 0;
let xOrientation = null;
let tiltThreshold = 15;
let score = 0;
let gameStarted = false; 

// Voeg event listeners toe voor apparaat oriëntatieveranderingen
window.addEventListener('deviceorientation', handleOrientation);
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', showNextMonument);
nextQuestionButton.addEventListener('click', showNextMonument); // volgende vraag knop

// starten spel
function startGame() {
    welcomePage.style.display = 'none';
    gameContainer.style.display = 'block';
    showMonument();
    gameStarted = true;
}

// aangeroepen wanneer de apparaatoriëntatie verandert
function handleOrientation(event) {
    // Controleer of het spel is gestart
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

// huidige monument weergeven
function showMonument() {
    const currentMonument = monuments[currentMonumentIndex];
    monumentImage.src = currentMonument.image;

    option1.textContent = currentMonument.countries[0];
    option2.textContent = currentMonument.countries[1];

    feedbackMessage.textContent = ''; // Reset het feedbackbericht
    nextButton.style.display = 'none'; // Verberg de knop voor het volgende monument

    updateScore(); // score bijwerken
}

// correct of niet?
function checkAnswer(selectedOption) {
    const currentMonument = monuments[currentMonumentIndex];
    if (selectedOption === currentMonument.correctAnswer) {
        score++;
        feedbackMessage.textContent = 'Juist!';
    } else {
        score--;
        feedbackMessage.textContent = 'Fout!';
    }
    nextButton.style.display = 'block'; // Toon de knop voor het volgende monument
}

// score tonen
function updateScore() {
    scoreDisplay.textContent = 'Score: ' + score;
}

// volgend monument weergeven
function showNextMonument() {
    currentMonumentIndex++;
    if (currentMonumentIndex >= monuments.length) {
        currentMonumentIndex = 0;
    }
    showMonument();
}
