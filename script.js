const monuments = [
    { 
        image: 'atomium.jpeg', 
        countries: ['België', 'Nederland'], 
        correctAnswer: 0, 
        info: 'Het Atomium is een monument in Brussel, België, en is een symbool van het Atomium van Brussel. Het werd oorspronkelijk gebouwd voor de Wereldtentoonstelling van 1958 en is sindsdien een populaire toeristische attractie geworden.' 
    },
    { 
        image: 'eiffeltoren.jpeg', 
        countries: ['Frankrijk', 'Spanje'], 
        correctAnswer: 0, 
        info: 'De Eiffeltoren is een van de bekendste bezienswaardigheden ter wereld en een symbool van Parijs. Het werd ontworpen door Gustave Eiffel voor de Wereldtentoonstelling van 1889 en is sindsdien een iconisch kenmerk van de stad geworden.' 
    },
    { 
        image: 'china.jpg', 
        countries: ['Thailand', 'China'], 
        correctAnswer: 1, 
        info: 'De Chinese Muur is een reeks verdedigingswerken in Noord-China, gebouwd tussen de 7e eeuw voor Christus en de 17e eeuw na Christus. Het is een van de meest indrukwekkende bouwwerken ter wereld en een UNESCO-werelderfgoed.' 
    },
    { 
        image: 'burjKhalifa.jpg', 
        countries: ['Verenigde Arabische Emiraten', 'Saoedi-Arabië'], 
        correctAnswer: 0, 
        info: 'De Burj Khalifa, gelegen in Dubai, Verenigde Arabische Emiraten, is het hoogste gebouw ter wereld met een hoogte van meer dan 828 meter. Het is een symbool van moderniteit en innovatie en trekt miljoenen bezoekers per jaar.' 
    },
    { 
        image: 'Christus.jpg', 
        countries: ['Brazilië', 'Italië'], 
        correctAnswer: 0, 
        info: 'Christus de Verlosser is een groot standbeeld van Jezus Christus in Rio de Janeiro, Brazilië, en is een van de meest iconische bezienswaardigheden van het land. Het staat op de top van de Corcovado-berg en biedt een adembenemend uitzicht over de stad.' 
    },
    { 
        image: 'Colosseum.jpg', 
        countries: ['Italië', 'Griekenland'], 
        correctAnswer: 0, 
        info: 'Het Colosseum, gelegen in Rome, Italië, is een oud amfitheater dat werd gebruikt voor gladiatorengevechten en andere openbare spektakels. Het is een van de meest herkenbare overblijfselen van het oude Rome en trekt jaarlijks miljoenen bezoekers.' 
    },
    { 
        image: 'sagrada.webp', 
        countries: ['Spanje', 'Portugal'], 
        correctAnswer: 0, 
        info: 'De Sagrada Família is een basiliek in Barcelona, Spanje, ontworpen door de beroemde architect Antoni Gaudí, en staat bekend om zijn unieke architecturale stijl. Het is een van de meest bezochte attracties van Spanje en wordt beschouwd als een meesterwerk van de moderne architectuur.' 
    },
    { 
        image: 'tajMahal.jpeg', 
        countries: ['India', 'Pakistan'], 
        correctAnswer: 0, 
        info: 'De Taj Mahal is een iconisch marmeren mausoleum in Agra, India, gebouwd in opdracht van keizer Shah Jahan ter nagedachtenis aan zijn vrouw Mumtaz Mahal. Het staat bekend om zijn prachtige architectuur en wordt beschouwd als een van de zeven wereldwonderen.' 
    }
];

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
    document.getElementById('.info-page').style.display = 'none'; // Verberg de info-pagina
    gameContainer.style.display = 'block'; // Toon het spelcontainer
    currentMonumentIndex++;
    if (currentMonumentIndex >= monuments.length) {
        currentMonumentIndex = 0;
    }
    showMonument();
}
