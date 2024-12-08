const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
const tablero = document.getElementById('tablero');
const botonReset = document.getElementById('boton-reset');
let cartasSeleccionadas = [];
let cartasEncontradas = 0;

function iniciarJuego() {
    tablero.innerHTML = '';
    cartasSeleccionadas = [];
    cartasEncontradas = 0;

    const cartasMezcladas = [...emojis, ...emojis].sort(() => 0.5 - Math.random());

    cartasMezcladas.forEach((emoji, index) => {
        const carta = document.createElement('div');
        carta.classList.add('carta');
        carta.dataset.emoji = emoji;
        carta.dataset.index = index;
        carta.addEventListener('click', seleccionarCarta);
        tablero.appendChild(carta);
    });
}

function seleccionarCarta() {
    if (this.classList.contains('revelada') || this.classList.contains('encontrada')) return;

    this.textContent = this.dataset.emoji;
    this.classList.add('revelada');
    cartasSeleccionadas.push(this);

    if (cartasSeleccionadas.length === 2) {
        setTimeout(verificarPares, 500);
    }
}

function verificarPares() {
    const [carta1, carta2] = cartasSeleccionadas;

    if (carta1.dataset.emoji === carta2.dataset.emoji && carta1.dataset.index !== carta2.dataset.index) {
        carta1.classList.add('encontrada');
        carta2.classList.add('encontrada');
        cartasEncontradas += 2;

        if (cartasEncontradas === emojis.length * 2) {
            alert('¡Ganaste el juego!');
        }
    } else {
        carta1.textContent = '';
        carta2.textContent = '';
        carta1.classList.remove('revelada');
        carta2.classList.remove('revelada');
    }

    cartasSeleccionadas = [];
}

botonReset.addEventListener('click', iniciarJuego);
iniciarJuego();