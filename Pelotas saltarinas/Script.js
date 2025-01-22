const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const puntos = [];
const colores = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', 
                '#00FFFF', '#FFA500', '#800080', '#008000', '#FFC0CB'];

class Punto {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radio = 10;
        this.velocidadX = (Math.random() - 0.5) * 10;
        this.velocidadY = -15;
        this.gravedad = 0.8;
        this.colorIndex = 0;
        this.colorActual = colores[0];
        this.energyLoss = 1;
    }

    actualizar() {
        this.velocidadY += this.gravedad;
        this.x += this.velocidadX;
        this.y += this.velocidadY;

        
        if (this.y + this.radio > canvas.height) {
            this.y = canvas.height - this.radio;
            this.velocidadY = -this.velocidadY * this.energyLoss;
            
            this.colorIndex = (this.colorIndex + 1) % colores.length;
            this.colorActual = colores[this.colorIndex];
        }

        
        if (this.x + this.radio > canvas.width) {
            this.x = canvas.width - this.radio;
            this.velocidadX = -this.velocidadX * this.energyLoss;
        }
        if (this.x - this.radio < 0) {
            this.x = this.radio;
            this.velocidadX = -this.velocidadX * this.energyLoss;
        }

        
        if (this.y - this.radio < 0) {
            this.y = this.radio;
            this.velocidadY = -this.velocidadY * this.energyLoss;
        }
    }

    dibujar() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
        ctx.fillStyle = this.colorActual;
        ctx.fill();
        ctx.closePath();
    }
}


function ajustarCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', ajustarCanvas);
ajustarCanvas();


canvas.addEventListener('mousedown', (e) => {
    if (puntos.length < 200) {
        puntos.push(new Punto(e.clientX, e.clientY));
    }
});


document.getElementById('limpiar').addEventListener('click', () => {
    puntos.length = 0;
});


function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    puntos.forEach(punto => {
        punto.actualizar();
        punto.dibujar();
    });

    requestAnimationFrame(animar);
}

animar();