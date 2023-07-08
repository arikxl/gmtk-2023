const holes = [...document.querySelectorAll('.hole')];
const scoreLabel = document.getElementById('scoreSpan')
const LifeLabel = document.getElementById('lifeSpan')
const hammer1 = document.getElementById('hammer1');
const hammer2 = document.getElementById('hammer2');
const hammer3 = document.getElementById('hammer3');
const board = document.getElementById('board');
const img = document.createElement('img');
const h1 = document.querySelector('h1')


const live ="❤️"
let lives = 3;
let score = 0;
let position = 4;
let player1 = holes[position];
let cantMove = false;
let speed = 1200;
let isGameOver = false;

LifeLabel.innerHTML = live.repeat(lives);

function newGame() {
    lives = 3;
    score = 0;
    position = 4;
    player1 = holes[position];
    cantMove = false;
    speed = 1200;
    isGameOver = false;
    LifeLabel.innerHTML = live.repeat(lives);

    hammer2.style.display = 'none';
    hammer3.style.display = 'none';
    h1.innerHTML = 'Save the Mole';
    h1.classList.remove('gameOver');
    h1.classList.add('glow');
    document.getElementById('gameOverMsg').style.display = 'none';
    document.getElementById('board').style.display ='block';

    addMole();
}

function addMole() {
    img.classList.add('mole');
    img.src = "assets/img/mole.png";
    player1.appendChild(img);
}
addMole();


function moveRight() {
    if(position===2 || position===5 || position===8) return;
    player1 = holes[position+=1];
    addMole();
}
function moveLeft() {
    if(position===0 || position===3 || position===6) return;
    player1 = holes[position-=1];
    addMole();
}
function moveDown() {
    if(position>5) return;
    player1 = holes[position+=3];
    addMole();

}
function moveUp() {
    if(position<3) return;
    player1 = holes[position -= 3];
    addMole();
}

document.addEventListener('keydown', function (event) {
    if (cantMove) return;
    if (event.code === 'ArrowRight') {
        moveRight()   
    }
    if (event.code === 'ArrowLeft') {
        moveLeft()   
    }
    if (event.code === 'ArrowUp') {
      moveUp()
    }
    if (event.code === 'ArrowDown') {
      moveDown()
    }
});


function moveHammer() {
    if (isGameOver) return;
    if (score === 15) hammer2.style.display = 'block';
    if (score === 30) hammer3.style.display = 'block';

    hammer1.classList.add('active');
    hammer2.classList.add('active');
    hammer3.classList.add('active');

    const positions = [
        {x:90, y:50},{x:300, y:50},{x:530, y:50},
        {x:90, y:280},{x:300, y:280},{x:530, y:280},
        {x:90, y:500},{x:300, y:500},{x:530, y:500},
    ]

    let i, j, k;

    do {
        i = ~~(Math.random() * 9);
        j = ~~(Math.random() * 9);
        k = ~~(Math.random() * 9);
    } while (i === j || i === k || j === k);
                
        hammer1.style.left = positions[i].x + 'px';
        hammer1.style.top = positions[i].y + 'px';
        
        hammer2.style.left = positions[j].x + 'px';
        hammer2.style.top = positions[j].y + 'px';
        
        hammer3.style.left = positions[k].y + 'px';
        hammer3.style.top = positions[k].y + 'px';

       
        setTimeout(() => {
            hammer1.classList.remove('active');
            hammer2.classList.remove('active');
            hammer3.classList.remove('active');
            score += 1;
            scoreLabel.innerHTML = score;
            if (position === i ||
                (score > 15 && (position === j|| position === i)) ||
                (score > 30 && (position === k||position === j|| position ===i))
            ) hit()
        }, 400);
    if (score > 40) speed = 1000;
}

setInterval(moveHammer, speed);

function hit() {  
    if(isGameOver) return;
    const hitSound = new Audio('assets/sound/mole_hit.wav');
    // hitSound.play();
    if (lives === 1) {
        isGameOver = true;
        setTimeout(() => {
            gameOver()
        }, 1500);

    }
    lives -= 1;
    LifeLabel.innerHTML = live.repeat(lives)
    img.src = "assets/img/boom.png";
    cantMove = true;

    holes[position].classList.add('blood');

    setTimeout(() => {
        cantMove = false;
        holes[position].classList.remove('blood');

    }, 1500);
}


function gameOver() {
        
        h1.innerHTML = 'Game Over!';
        h1.classList.add('gameOver');
        document.getElementById('board').style.display = 'none';
        document.getElementById('gameOverMsg').style.display = 'block';

}
