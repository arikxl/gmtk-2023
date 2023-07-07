const holes = [...document.querySelectorAll('.hole')];
const scoreLabel = document.getElementById('scoreSpan')

let score = 0;


function startGame() {
    const player = holes[4];
    const img = document.createElement('img');
    img.classList.add('mole');
    img.src = "assets/mole.png";
    player.appendChild(img);
}

startGame()

function moveMole() {
    const player = holes[1];
    player.classList.add('player');



}
moveMole();

    document.addEventListener('keydown', function(event) {
  console.log('event:', event)
  // Check if the pressed key is the Enter key (key code 13)
  if (event.keyCode === 13) {
    // Perform some action
    console.log('Enter key pressed!');
  }
});





function run() {
    const i = Math.floor(Math.random() * holes.length); 
    const hole = holes[i];
    let timer = null;

    const img = document.createElement('img');
    img.classList.add('mole');
    img.src = "assets/mole.png";

    
    img.addEventListener('click', () => {
        img.src = "assets/mole-whacked.png";
        score +=10;
        scoreLabel.innerHTML = score;
    })
    
    // hole.appendChild(img);

    timer = setTimeout(() => {
        hole.appendChild(img);
        run()
    }, 1500)
}

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