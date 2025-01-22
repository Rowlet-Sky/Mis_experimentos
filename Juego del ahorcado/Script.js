const words = [
    // Tecnología
    'JAVASCRIPT', 'DESARROLLO', 'PROGRAMACION', 'COMPUTADORA', 'TECNOLOGIA', 'INTERNET', 'VIDEOJUEGO',
    'APLICACION', 'SERVIDOR', 'NAVEGADOR', 'DATOS',
    // Naturaleza
    'MONTAÑA', 'OCEANO', 'BOSQUE', 'DESIERTO', 'CASCADA', 'VOLCAN', 'GLACIAR', 'SELVA', 'LAGUNA',
    // Animales
    'ELEFANTE', 'JIRAFA', 'LEOPARDO', 'PINGUINO', 'DELFIN', 'BALLENA', 'COCODRILO', 'MARIPOSA',
    // Deportes
    'NATACION', 'BALONCESTO', 'ATLETISMO', 'CICLISMO', 'GIMNASIA', 'VOLLEYBALL', 'TENIS',
    // Ciencia
    'QUIMICA', 'BIOLOGIA', 'GALAXIA', 'MOLECULA', 'PLANETA', 'ESTRELLA', 'UNIVERSO',
    // Profesiones
    'ARQUITECTO', 'INGENIERO', 'PROFESOR', 'ASTRONAUTA', 'DETECTIVE', 'PERIODISTA',
    // Música
    'GUITARRA', 'BATERIA', 'VIOLIN', 'TROMPETA', 'SAXOFON', 'ORQUESTA', 'MELODIA',
    // Comida
    'CHOCOLATE', 'ENSALADA', 'HAMBURGUESA', 'ESPAGUETI', 'ZANAHORIA', 'NARANJA'
];

// Estados del ahorcado
const hangmanStages = [
    `
  +---+
  |   |
      |
      |
      |
      |
=========`,
    `
  +---+
  |   |
  O   |
      |
      |
      |
=========`,
    `
  +---+
  |   |
  O   |
  |   |
      |
      |
=========`,
    `
  +---+
  |   |
  O   |
 /|   |
      |
      |
=========`,
    `
  +---+
  |   |
  O   |
 /|\\  |
      |
      |
=========`,
    `
  +---+
  |   |
  O   |
 /|\\  |
 /    |
      |
=========`,
    `
  +---+
  |   |
  O   |
 /|\\  |
 / \\  |
      |
=========`
];

let word = '';
let guessedLetters = new Set();
let wrongGuesses = 0;
let gameOver = false;

function initGame() {
    word = words[Math.floor(Math.random() * words.length)];
    guessedLetters = new Set();
    wrongGuesses = 0;
    gameOver = false;
    updateDisplay();
    createLetterButtons();
}


function updateDisplay() {
    document.getElementById('hangman').textContent = hangmanStages[wrongGuesses];

    const wordDisplay = word
        .split('')
        .map(letter => guessedLetters.has(letter) ? letter : '_')
        .join(' ');
    document.getElementById('wordDisplay').textContent = wordDisplay;

    if (!wordDisplay.includes('_')) {
        document.getElementById('message').textContent = '¡Felicidades! ¡Has ganado! 🎉';
        gameOver = true;
    } else if (wrongGuesses >= 6) {
        document.getElementById('message').textContent = `¡Perdiste! La palabra era: ${word} 😔`;
        gameOver = true;
    } else {
        document.getElementById('message').textContent = '';
    }
}


function createLetterButtons() {
    const lettersContainer = document.getElementById('letters');
    lettersContainer.innerHTML = '';
    
    for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i);
        const button = document.createElement('button');
        button.textContent = letter;
        button.className = 'letter-btn';
        button.addEventListener('click', () => handleGuess(letter));
        lettersContainer.appendChild(button);
    }
}


function handleGuess(letter) {
    if (gameOver || guessedLetters.has(letter)) return;

    guessedLetters.add(letter);
    if (!word.includes(letter)) {
        wrongGuesses++;
    }

    updateDisplay();

    const buttons = document.querySelectorAll('.letter-btn');
    buttons.forEach(btn => {
        if (btn.textContent === letter) {
            btn.disabled = true;
        }
    });
}


document.getElementById('resetBtn').addEventListener('click', initGame);


initGame();