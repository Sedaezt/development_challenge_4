const monumentImage = document.getElementById('monument-image');
const option1 = document.getElementById('option1');
const option2 = document.getElementById('option2');
const scoreDisplay = document.getElementById('score');  // score bijhouden

const monuments = [
    { image: 'atomium.jpeg', countries: ['België', 'Nederland'], correctAnswer: 0 },
    { image: 'eiffeltoren.jpeg', countries: ['Frankrijk', 'Spanje'], correctAnswer: 0 },
];

let currentMonumentIndex = 0;
let xOrientation = null;
let tiltThreshold = 15;
let score = 0;

//apparaat oriëntatie veranderen
window.addEventListener('deviceorientation', handleOrientation);

// functie aanroepen
function handleOrientation(event) {
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

// monument tonen
function showMonument() {
    // uit array halen
    const currentMonument = monuments[currentMonumentIndex];
    monumentImage.src = currentMonument.image;

    // tekst veranderen
    option1.textContent = currentMonument.countries[0];
    option2.textContent = currentMonument.countries[1];

    updateScore();
}

// controleren of het geselecteerde antwoord correct is
function checkAnswer(selectedOption) {
    const currentMonument = monuments[currentMonumentIndex];
    if (selectedOption === currentMonument.correctAnswer) {
        score++;
        alert('Correct!');
    }

    // naar het volgende monument gaan
    currentMonumentIndex++;
    if (currentMonumentIndex >= monuments.length) {
        currentMonumentIndex = 0;
    }

    showMonument();
}

// score weergevengit
function updateScore() {
    scoreDisplay.textContent = 'Score: ' + score;
}

showMonument();
