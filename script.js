const welcomePage = document.querySelector('.welcome-page');
const gameContainer = document.querySelector('.game-container');
const monumentImage = document.querySelector('.monument-image');
const option1 = document.getElementById('option1');
const option2 = document.getElementById('option2');
const feedbackMessage = document.querySelector('.feedback-message');
const nextButton = document.querySelector('.next-button');
const startButton = document.querySelector('.start-button');
const nextQuestionButton = document.querySelector('.next-question-button');

const monuments = [
    { image: 'atomium.jpeg', countries: ['België', 'Nederland'], correctAnswer: 0, info: 'Het Atomium is een monument in Brussel, België, en is een symbool van het Atomium van Brussel.' },
    { image: 'eiffeltoren.jpeg', countries: ['Frankrijk', 'Spanje'], correctAnswer: 0, info: 'De Eiffeltoren is een van de bekendste bezienswaardigheden ter wereld en een symbool van Parijs.' },
    { image: 'china.jpg', countries: ['Thailand', 'China'], correctAnswer: 1, info: 'De Chinese Muur is een reeks verdedigingswerken in Noord-China, gebouwd tussen de 7e eeuw voor Christus en de 17e eeuw na Christus.' },
    { image: 'burjKhalifa.jpg', countries: ['Verenigde Arabische Emiraten', 'Saoedi-Arabië'], correctAnswer: 0, info: 'De Burj Khalifa, gelegen in Dubai, Verenigde Arabische Emiraten, is het hoogste gebouw ter wereld met een hoogte van meer dan 828 meter.'},
    { image: 'Christus.jpg', countries: ['Brazilië', 'Italië'], correctAnswer: 0, info: 'Christus de Verlosser is een groot standbeeld van Jezus Christus in Rio de Janeiro, Brazilië, en is een van de meest iconische bezienswaardigheden van het land.'},
    { image: 'Colosseum.jpg', countries: ['Italië', 'Griekenland'], correctAnswer: 0, info: 'Het Colosseum, gelegen in Rome, Italië, is een oud amfitheater dat werd gebruikt voor gladiatorengevechten en andere openbare spektakels.'},
    { image: 'sagrada.webp', countries: ['Spanje', 'Portugal'], correctAnswer: 0, info: 'De Sagrada Família is een basiliek in Barcelona, Spanje, ontworpen door de beroemde architect Antoni Gaudí, en staat bekend om zijn unieke architecturale stijl.'},
    { image: 'tajMahal.jpeg', countries: ['India', 'Pakistan'], correctAnswer: 0, info: 'De Taj Mahal is een iconisch marmeren mausoleum in Agra, India, gebouwd in opdracht van keizer Shah Jahan ter nagedachtenis aan zijn vrouw Mumtaz Mahal.'},
  
];

let currentMonumentIndex = 0;
let xOrientation = null;
let tiltThreshold = 15;
let gameStarted = false; 

// apparaat oriëntatieveranderingen
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
}

// correct of niet?
function checkAnswer(selectedOption) {
    const currentMonument = monuments[currentMonumentIndex];
    if (selectedOption === currentMonument.correctAnswer) {
        feedbackMessage.textContent = 'Good job!';
        feedbackMessage.style.color = 'green'; 
    } else {
        feedbackMessage.textContent = 'Wrong!';
        feedbackMessage.style.color = 'red';
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

// volgend monument weergeven
function showNextMonument() {
    document.querySelector('.info-page').style.display = 'none'; // Verberg de info-pagina
    gameContainer.style.display = 'block'; // Toon het spelcontainer
    currentMonumentIndex++;
    if (currentMonumentIndex >= monuments.length) {
        currentMonumentIndex = 0;
    }
    showMonument();
}