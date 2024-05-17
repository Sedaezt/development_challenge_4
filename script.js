const monumentImage = document.getElementById('monument-image');
const leftOption = document.getElementById('left-option');
const rightOption = document.getElementById('right-option');

const monuments = [
    { image: 'atomium.jpeg', correctAnswer: 'left' },
    { image: 'eiffeltoren.jpeg', correctAnswer: 'right' },
];

// monument index
let currentMonumentIndex = 0;  
let xOrientation = null;


// monument tonen
function showMonument() {
    const currentMonument = monuments[currentMonumentIndex];
    monumentImage.src = currentMonument.image;

    // klikken op knop
    leftOption.addEventListener('click', () => checkAnswer('left'));
    rightOption.addEventListener('click', () => checkAnswer('right'));
}

// checken of het klopt
function checkAnswer(selectedOption) {
    const currentMonument = monuments[currentMonumentIndex];
    if (selectedOption === currentMonument.correctAnswer) {
        alert('Juist!');
    } else {
        alert('Fout!');
    }

    currentMonumentIndex++;
    // opnieuw beginnen
    if (currentMonumentIndex >= monuments.length) {
        currentMonumentIndex = 0;
    }

    showMonument();
}

showMonument();
