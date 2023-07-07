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

LifeLabel.innerHTML=live.repeat(lives)

function addMole() {
    img.classList.add('mole');
    img.src = "assets/img/mole.png";
    player1.appendChild(img);
}
addMole();

console.log('board.style.top:', board.style.top)



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
    const boardWidth = board.offsetWidth;
    const boardHeight = board.offsetHeight;   

    // Generate random positions within the board's dimensions
    const posX = ~~(Math.random() * (boardWidth - hammer.offsetWidth));
    const posY = ~~(Math.random() * (boardHeight - hammer.offsetHeight));

  // Update the position of the hammer
    hammer.style.left = posX + 'px';
    hammer.style.top = 500 + 'px';
    // hammer.style.top = posY + 'px';
    
    setTimeout(() => {
        hammer.classList.remove('active');
    }, 600);
    console.log(hammer.style.top)
    
}

setInterval(moveHammer, 1200);




// function run() {
//     const i = Math.floor(Math.random() * holes.length); 
//     const hole = holes[i];
//     let timer = null;

//     const img = document.createElement('img');
//     img.classList.add('mole');
//     img.src = "assets/mole.png";

    
//     img.addEventListener('click', () => {
//         img.src = "assets/mole-whacked.png";
//         score +=10;
//         scoreLabel.innerHTML = score;
//     })
    
//     // hole.appendChild(img);

//     timer = setTimeout(() => {
//         hole.appendChild(img);
//         run()
//     }, 1500)
// }

// run()

// window.addEventListener('mousemove', e => {
//     cursor.style.top = e.pageY + 'px';
//     cursor.style.left = e.pageX + 'px';
// })

// window.addEventListener('mousedown', () => {
//     cursor.classList.add('active');
// })
// window.addEventListener('mouseup', () => {
//     cursor.classList.remove('active');
// })