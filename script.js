const start = document.querySelector('#start')
const game = document.querySelector('#game')
const heatsScore = document.querySelector('#heats')
const gameStatus = document.querySelector('#status')
const difirculty = document.querySelector('#difirculty')

let changeTime = 0



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
let nasralla


var audio = new Audio('audio/song1.mp3')
var shotgun = new Audio('audio/shotgun.mp3')
var claps = new Audio('audio/claps.mp3')


let heats = 0
heatsScore.textContent = `ניקוד: ${heats}`

start.addEventListener('click', () => {
    game.innerHTML = ''
    nasralla = document.createElement('img')
    nasralla.className = 'nas'
    nasralla.id = 'bool'
    nasralla.src = 'pic/nas.png'
    game.appendChild(nasralla)

    if (difirculty.value === "קל"){
        changeTime = 1500
        console.log('easy')
    }
    else if (difirculty.value === "בינוני"){
        changeTime = 1000
    }
    else if (difirculty.value === "קשה"){
        changeTime = 800
        console.log('hard')
    }

    startStopTimer()
    audio.play()

    moveNasralla()
})

let moveNasrallaInterval
function moveNasralla() {
    moveNasrallaInterval = setInterval(() => {
        const gameRect = game.getBoundingClientRect()
        const nasrallaRect = nasralla.getBoundingClientRect()


        const randomX = Math.random() * (gameRect.width - nasrallaRect.width)
        const randomY = Math.random() * (gameRect.height - nasrallaRect.height)
        const minWidth = 15
        const maxWidth = 50
    

        const randWidth = Math.random() * (maxWidth - minWidth) + minWidth
        

        nasralla.style.left = `${randomX}px`
        nasralla.style.top = `${randomY}px`
        nasralla.style.width = `${randWidth}px`
    }, changeTime);

    nasralla.addEventListener('click', () => {
        heats++
        shotgun.play()
        heatsScore.textContent = `ניקוד: ${heats}`
        


        if (heats === 10) {
            gameStatus.textContent = "חיסלת את נסראללה"
            claps.play()
            startStopTimer()
            clearInterval(moveNasrallaInterval)
            game.innerHTML = ``
        }

        
        let timefix = () => {
            let timeText = document.querySelector('#stopWatch').textContent.replace("זמן: ", '')
            let [minutes, seconds] = timeText.split(':').map(Number)
            return (minutes * 60) + seconds
        }
        let theLastTime = timefix()


        if (heats < 10 && theLastTime >= 20) {
            gameStatus.textContent = "נכשלת בחיסול של נסראללה"
            clearInterval(moveNasrallaInterval)
            startStopTimer()
            game.innerHTML = ``
        }
    })

}
