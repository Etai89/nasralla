const start = document.querySelector('#start');
const game = document.querySelector('#game');
const heatsScore = document.querySelector('#heats');
const gameStatus = document.querySelector('#status');

let seconds = 0
let timerInterval = null
const stopwatch = document.querySelector('#stopWatch')

const displayStopWatch = () => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    stopwatch.textContent = `זמן: ${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
}

const startStopTimer = () => {
    if (timerInterval === null) {
        timerInterval = setInterval(() => {
            seconds++
            displayStopWatch()
        }, 1000)
    } else {
        clearInterval(timerInterval)
        timerInterval = null
    }
}
displayStopWatch()
let nasralla;


var audio = new Audio('audio/song1.mp3');
var shotgun = new Audio('audio/shotgun.mp3');

let heats = 0
heatsScore.textContent = `ניקוד: ${heats}`

start.addEventListener('click', () => {
    game.innerHTML = ''; // Clear the game area
    nasralla = document.createElement('img');
    nasralla.className = 'nas';
    nasralla.id = 'bool';
    nasralla.src = 'pic/nas.png'; // Replace with your image path
    game.appendChild(nasralla);

    startStopTimer()
    audio.play();
    // Start the random movement
    moveNasralla();
});


function moveNasralla() {
    setInterval(() => {
        const gameRect = game.getBoundingClientRect();
        const nasrallaRect = nasralla.getBoundingClientRect();

        // Calculate random positions within the game area
        const randomX = Math.random() * (gameRect.width - nasrallaRect.width);
        const randomY = Math.random() * (gameRect.height - nasrallaRect.height);

        // Update nasralla's position
        nasralla.style.left = `${randomX}px`;
        nasralla.style.top = `${randomY}px`;
    }, 1000); // Change position every 1 second (1000 ms)

    nasralla.addEventListener('click', () => {
        heats++ + 1
        shotgun.play()
        heatsScore.textContent = `ניקוד: ${heats}`
        if (heats === 10) {
            gameStatus.textContent = "חיסלת את נסראללה"
            startStopTimer()
            
            
        }
        let timefix =() =>{
            let timeText = document.querySelector('#stopWatch').textContent.replace("זמן: ", '');
            let [minutes, seconds] = timeText.split(':').map(Number);
            let lastTime = (minutes * 60) + seconds;
            return lastTime
        }
        
        
        let theLastTime = timefix()


        if (heats < 10 && theLastTime >= 10) {
            gameStatus.textContent = "You lost to Nasrralla";
            return
        }


    })
}
