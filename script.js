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
var claps = new Audio('audio/claps.mp3');


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

let moveNasrallaInterval
function moveNasralla() {
    moveNasrallaInterval = setInterval(() => {
        const gameRect = game.getBoundingClientRect();
        const nasrallaRect = nasralla.getBoundingClientRect();

        // Calculate random positions within the game area
        const randomX = Math.random() * (gameRect.width - nasrallaRect.width);
        const randomY = Math.random() * (gameRect.height - nasrallaRect.height);
        const minWidth = 15; // in pixels
        const maxWidth = 50; // in pixels
    
        // Generate a random width within the range
        const randWidth = Math.random() * (maxWidth - minWidth) + minWidth;
        
        // Update nasralla's position and size
        nasralla.style.left = `${randomX}px`;
        nasralla.style.top = `${randomY}px`;
        nasralla.style.width = `${randWidth}px`;
    }, 1000); // Change position every 1 second (1000 ms)

    nasralla.addEventListener('click', () => {
        heats++;
        shotgun.play();
        heatsScore.textContent = `ניקוד: ${heats}`;
        


        if (heats === 20) {
            gameStatus.textContent = "חיסלת את נסראללה";
            claps.play();
            startStopTimer(); // Stop the timer
            clearInterval(moveNasrallaInterval); // Stop nasralla movement
        }

        // Calculate elapsed time
        let timefix = () => {
            let timeText = document.querySelector('#stopWatch').textContent.replace("זמן: ", '');
            let [minutes, seconds] = timeText.split(':').map(Number);
            return (minutes * 60) + seconds;
        };
        let theLastTime = timefix();


        if (heats < 20 && theLastTime >= 19) {
            gameStatus.textContent = "נכשלת בחיסול של נסראללה";
            clearInterval(moveNasrallaInterval); // Stop nasralla movement if time runs out
            startStopTimer()
        }
    });

}
