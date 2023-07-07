const holes = [...document.querySelectorAll('.hole')];
const scoreLabel = document.getElementById('scoreSpan')
const LifeLabel = document.getElementById('lifeSpan')
const hammer = document.getElementById('hammer1');
const board = document.getElementById('board');
const img = document.createElement('img');

const live ="❤️"
let lives = 3;
let score = 0;
let position = 4;
let player1 = holes[position];
let cantMove = false;

LifeLabel.innerHTML=live.repeat(lives)

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
    hammer.classList.add('active');

    const Xs = [90, 300, 530];
    const Ys = [50, 280, 500];
    const positions = [
        {x:90, y:50},{x:300, y:50},{x:530, y:50},
        {x:90, y:280},{x:300, y:280},{x:530, y:280},
        {x:90, y:500},{x:300, y:500},{x:530, y:500},
    ]
    const i = ~~(Math.random() * 9); 
    // const j = ~~(Math.random() * 3); 

    hammer.style.left = positions[i].x + 'px';
    // hammer.style.left = Xs[i] + 'px';
    // hammer.style.top = Ys[j] + 'px';
    hammer.style.top = positions[i].y + 'px';
    
    setTimeout(() => {
        hammer.classList.remove('active');
        score += 1;
        scoreLabel.innerHTML = score;
        if(position ===i) hit()
    }, 400);
}

setInterval(moveHammer, 1200);

function hit() {  
    const hitSound = new Audio('assets/sound/mole_hit.wav');
    // hitSound.play();

    lives -= 1;
    LifeLabel.innerHTML = live.repeat(lives)
    img.src = "assets/img/boom.png";
    cantMove = true;

    holes[position].classList.add('blood-effect');


    setTimeout(() => {
        cantMove = false;
        holes[position].classList.remove('blood-effect');

    }, 1500);
}

