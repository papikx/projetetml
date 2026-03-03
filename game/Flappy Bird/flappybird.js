
//plateau
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

//oiseau
let birdWidth = 34; //rapport largeur/hauteur = 408/228 = 17/12
let birdHeight = 24;
let birdX = boardWidth / 8;
let birdY = boardHeight / 2;
//let birdImg;
let birdImgs = [];
let birdImgsIndex = 0;

let bird = {
    x: birdX,
    y: birdY,
    width: birdWidth,
    height: birdHeight
}

//tuyaux
let pipeArray = [];
let pipeWidth = 64; //rapport largeur/hauteur = 384/3072 = 1/8
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

//physique
let baseVelocityX = -2; // vitesse de base
let velocityX = baseVelocityX; // vitesse actuelle
let velocityY = 0; // vitesse de saut
let gravity = 0.4;

let gameOver = false;
let score = 0;
let scoreEl = null;
let bestEl = null;
let bestScore = 0;
let gameOverTime = 0; // Horodatage de la fin de la partie
let lastTime = 0; // Horodatage de la dernière image
let pipeSpawnTimer = 0; // Minuteur pour l'apparition des tuyaux
const PIPE_SPAWN_INTERVAL = 1500; // Intervalle d'apparition prévu en ms (relatif à 60fps)

// Éléments de l'overlay Game Over
let gameOverOverlay = null;
let finalScoreEl = null;
let retryBtn = null;

let wingSound = new Audio("./sfx_wing.wav");
let hitSound = new Audio("./sfx_hit.wav");
let bgm = new Audio("./bgm_mario.mp3");

window.onload = function () {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); //utilisé pour dessiner sur le plateau

    //dessiner flappy bird
    // context.fillStyle = "green";
    // context.fillRect(bird.x, bird.y, bird.width, bird.height);

    //charger les images
    //birdImg = new Image();
    //birdImg.src = "./flappybird.png";
    //birdImg.onload = function() {
    //context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    //}

    for (let i = 0; i < 4; i++) {
        let birdImg = new Image();
        birdImg.src = `./flappybird${i}.png`;
        birdImgs.push(birdImg);
    }

    topPipeImg = new Image();
    topPipeImg.src = "./toppipe.png";

    bottomPipeImg = new Image();
    bottomPipeImg.src = "./bottompipe.png";

    requestAnimationFrame(update);
    // setInterval(placePipes, 1500); // Removed: now handled in update()
    setInterval(animateBird, 100); // Keep for animation
    document.addEventListener("keydown", moveBird);
    board.addEventListener("mousedown", moveBird);
    board.addEventListener("touchstart", function (e) {
        if (e.target.tagName !== "BUTTON" && e.target.tagName !== "INPUT" && e.target.tagName !== "LABEL") {
            e.preventDefault();
            moveBird(e);
        }
    }, { passive: false });

    // HUD elements
    scoreEl = document.getElementById('scoreVal');
    bestEl = document.getElementById('bestScore');
    bestScore = localStorage.getItem('flappy_bestScore') ? parseInt(localStorage.getItem('flappy_bestScore')) : 0;
    if (bestEl) bestEl.innerText = bestScore;

    // Button listeners
    const startBtn = document.getElementById('startBtn');
    const menuBtn = document.getElementById('menuBtn');

    // Éléments de l'overlay Game Over
    gameOverOverlay = document.getElementById('gameOverOverlay');
    if (gameOverOverlay) {
        gameOverOverlay.addEventListener("mousedown", moveBird);
        gameOverOverlay.addEventListener("touchstart", function (e) {
            if (e.target.tagName !== "BUTTON") {
                e.preventDefault();
                moveBird(e);
            }
        }, { passive: false });
    }
    finalScoreEl = document.getElementById('finalScore');
    retryBtn = document.getElementById('retryBtn');

    if (startBtn) {
        startBtn.addEventListener('click', () => {
            if (gameOver) {
                resetGame();
            } else {
                // If the game isn't over, maybe just play the sound?
                // Ou si c'est le tout premier démarrage, s'assurer qu'il semble réactif
                wingSound.play();
                velocityY = -6;
            }
        });
    }

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            // Retour au menu des jeux
            window.location.href = '../game_menu.html';
        });
    }
    if (retryBtn) {
        retryBtn.addEventListener('click', resetGame);
    }
}

function resetGame() {
    if (gameOverOverlay) gameOverOverlay.classList.add('hidden');
    bird.y = birdY;
    pipeArray = [];
    score = 0;
    gameOver = false;
    velocityX = baseVelocityX; // réinitialiser la vitesse
    velocityY = 0;
    bgm.pause();
    bgm.currentTime = 0;
    bgm.play();
}

function update(timestamp) {
    if (!lastTime) {
        lastTime = timestamp;
        requestAnimationFrame(update);
        return;
    }
    let deltaTimeInMs = timestamp - lastTime;
    let deltaTime = deltaTimeInMs / (1000 / 60); // Scale relative to 60 FPS

    // Limite de sécurité pour deltaTime (évite les sauts énormes si l'onglet était inactif ou si le système a ramé)
    if (deltaTime > 4) deltaTime = 4;

    lastTime = timestamp;

    requestAnimationFrame(update);
    if (gameOver) {
        return;
    }
    context.clearRect(0, 0, board.width, board.height);

    // Mise à l'échelle de la difficulté : augmenter la vitesse à mesure que le score augmente
    // vitesse = base + (score * facteur). Limiter à un maximum raisonnable.
    let speedFactor = 0.1;
    let maxSpeed = -8;
    velocityX = Math.max(baseVelocityX - (Math.floor(score) * speedFactor), maxSpeed);

    //oiseau
    velocityY += gravity * deltaTime;
    // bird.y += velocityY;
    bird.y = Math.max(bird.y + velocityY * deltaTime, 0); //appliquer la gravité à bird.y actuel, limiter bird.y au sommet du canevas
    //context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    context.drawImage(birdImgs[birdImgsIndex], bird.x, bird.y, bird.width, bird.height);
    //birdImgsIndex++; //incrementer l'index pour la prochaine image
    //birdImgsIndex %= birdImgs.length; // revenir au début avec le modulo, images max = 4
    // 0 1 2 3 0 1 2 3 0 1 2 3


    if (bird.y > board.height) {
        bgm.pause();
        bgm.currentTime = 0;
        gameOver = true;
        gameOverTime = Date.now();
        // update best
        if (Math.floor(score) > bestScore) {
            bestScore = Math.floor(score);
            localStorage.setItem('flappy_bestScore', bestScore);
            if (bestEl) bestEl.innerText = bestScore;
        }
    }

    // apparition des tuyaux basée sur le temps (synchronisée avec le mouvement du jeu via la boucle d'infographie)
    if (!gameOver) {
        pipeSpawnTimer += deltaTimeInMs;
        if (pipeSpawnTimer >= PIPE_SPAWN_INTERVAL) {
            placePipes();
            pipeSpawnTimer = 0;
        }
    }

    //tuyaux
    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += velocityX * deltaTime;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        if (!pipe.passed && bird.x > pipe.x + pipe.width) {
            score += 0.5; //0,5 car il y a 2 tuyaux! donc 0,5*2 = 1, 1 pour chaque ensemble de tuyaux
            pipe.passed = true;
        }

        if (detectCollision(bird, pipe)) {
            hitSound.play();
            bgm.pause();
            bgm.currentTime = 0;
            gameOver = true;
            // mettre à jour le meilleur score
            if (Math.floor(score) > bestScore) {
                bestScore = Math.floor(score);
                localStorage.setItem('flappy_bestScore', bestScore);
                if (bestEl) bestEl.innerText = bestScore;
            }
            gameOverTime = Date.now();
        }
    }

    //effacer les tuyaux
    while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
        pipeArray.shift(); //supprime le premier élément du tableau
    }

    // mettre à jour le score HUD
    if (scoreEl) scoreEl.innerText = Math.floor(score);

    if (gameOver) {
        if (gameOverOverlay) {
            gameOverOverlay.classList.remove('hidden');
            if (finalScoreEl) finalScoreEl.innerText = Math.floor(score);
        }
    }
}

function animateBird() {
    birdImgsIndex++; //incrementer l'index pour la prochaine image
    birdImgsIndex %= birdImgs.length; // revenir au début avec le modulo, images max = 4
}

function placePipes() {
    if (gameOver) {
        return;
    }

    //(0-1) * hauteurTuyau/2.
    // 0 -> -128 (hauteurTuyau/4)
    // 1 -> -128 - 256 (hauteurTuyau/4 - hauteurTuyau/2) = -3/4 hauteurTuyau
    let randomPipeY = pipeY - pipeHeight / 4 - Math.random() * (pipeHeight / 2);
    let openingSpace = board.height / 4;

    let topPipe = {
        img: topPipeImg,
        x: pipeX,
        y: randomPipeY,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    }
    pipeArray.push(topPipe);

    let bottomPipe = {
        img: bottomPipeImg,
        x: pipeX,
        y: randomPipeY + pipeHeight + openingSpace,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    }
    pipeArray.push(bottomPipe);
}

function moveBird(e) {
    // Ignorer les clics/taps sur les boutons
    if (e.target && e.target.tagName === "BUTTON") {
        return;
    }
    // S'il s'agit d'un événement clavier, vérifier les touches spécifiques
    if (e.type === "keydown") {
        if (!(e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyX")) {
            return;
        }
    }

    // Pour tout événement valide (touche, souris ou toucher), déclencher le saut
    if (!gameOver) {
        bgm.play();
        wingSound.play();
        velocityY = -6;
    } else {
        // réinitialiser le jeu si la partie est terminée
        // Ajouter un court délai (500ms) pour éviter les redémarrages accidentels
        if (Date.now() - gameOverTime > 500) {
            resetGame();
        }
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&   //le coin supérieur gauche de a n'atteint pas le coin supérieur droit de b
        a.x + a.width > b.x &&   //le coin supérieur droit de a dépasse le coin supérieur gauche de b
        a.y < b.y + b.height &&  //le coin supérieur gauche de a n'atteint pas le coin inférieur gauche de b
        a.y + a.height > b.y;    //le coin inférieur gauche de a dépasse le coin supérieur gauche de b
}