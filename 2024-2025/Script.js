const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeead'];


const starsContainer = document.getElementById('stars');
function createStars() {
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * 100 + 'vh';
        star.style.width = Math.random() * 3 + 'px';
        star.style.height = star.style.width;
        star.style.animationDelay = Math.random() * 2 + 's';
        starsContainer.appendChild(star);
    }
}


function createBalloon() {
    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    balloon.style.left = Math.random() * window.innerWidth + 'px';
    balloon.style.top = window.innerHeight + 'px';
    balloon.style.animationDelay = Math.random() * 2 + 's';
    
    document.body.appendChild(balloon);

    const animation = balloon.animate([
        { transform: `translate(0, 0)` },
        { transform: `translate(${Math.random() * 200 - 100}px, -${window.innerHeight + 200}px)` }
    ], {
        duration: 4000 + Math.random() * 3000,
        easing: 'ease-out'
    });

    animation.onfinish = () => balloon.remove();
}


document.addEventListener('DOMContentLoaded', () => {
    createStars();
 
    setInterval(createBalloon, 300);
});