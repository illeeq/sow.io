const pig = document.getElementById("pig");
const game = document.getElementById("game");
const input = document.getElementById("guess");
const message = document.getElementById("message");
const checkButton = document.getElementById("checkButton");
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let attempts = 0;
const maxAttempts = 3;
const secretWord = "свиноматка";
let gameOver = false;

let moveInterval = setInterval(() => {
    if (gameOver) return;
    pig.style.left = Math.random() * (window.innerWidth - 100) + "px";
    pig.style.top = Math.random() * (window.innerHeight - 100) + "px";
}, 700);

setTimeout(() => {
    game.classList.remove("hidden");
}, 2000);

function checkGuess() {
    if (gameOver) return;

    attempts++;
    const guess = input.value.toLowerCase().trim();

    if (guess === secretWord) {
        gameOver = true;
        clearInterval(moveInterval);
        input.style.display = "none";
        checkButton.style.display = "none";
        message.innerText = "ура свинка выжила";
        launchFireworks();
    } else if (attempts >= maxAttempts) {
        gameOver = true;
        clearInterval(moveInterval);
        pig.classList.add("fade-out");
        input.style.display = "none";
        checkButton.style.display = "none";
        message.innerText = "от грусти свинка умерла";
    } else {
        message.innerText = `неправильно, осталось ${maxAttempts - attempts} попытки`;
    }

    input.value = "";
}

checkButton.addEventListener("click", checkGuess);
input.addEventListener("keydown", e => { if (e.key === "Enter") checkGuess(); });

function launchFireworks() {
    const particles = [];
    const colors = ["red","orange","yellow","green","cyan","blue","magenta","white"];

    for (let i = 0; i < 5; i++) {
        const startX = Math.random() * canvas.width;
        const startY = Math.random() * canvas.height / 2;
        for (let j = 0; j < 50; j++) {
            particles.push({
                x: startX,
                y: startY,
                dx: (Math.random()-0.5)*8,
                dy: (Math.random()-0.5)*8,
                color: colors[Math.floor(Math.random()*colors.length)],
                alpha: 1
            });
        }
    }

    function animate() {
        ctx.fillStyle = "rgba(0,0,0,0.1)";
        ctx.fillRect(0,0,canvas.width,canvas.height);

        particles.forEach(p => {
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha;
            ctx.beginPath();
            ctx.arc(p.x,p.y,3,0,Math.PI*2);
            ctx.fill();

            p.x += p.dx;
            p.y += p.dy;
            p.alpha -= 0.0008;
        });

        const alive = particles.filter(p => p.alpha > 0);
        if (alive.length > 0) {
            requestAnimationFrame(animate);
        }
    }

    animate();
}




