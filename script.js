const start = document.querySelector('#start')
const game = document.querySelector('#game')
const heatsScore = document.querySelector('#heats')
const gameStatus = document.querySelector('#status')
const difirculty = document.querySelector('#difirculty')

let changeTime = 0
let seconds = 0
let timerInterval = null
const stopwatch = document.querySelector('#stopWatch')
let nasralla
let heats = 0
let moveNasrallaInterval
let conditionCheckInterval

const audio = new Audio('audio/song1.mp3')
const shotgun = new Audio('audio/shotgun.mp3')
const claps = new Audio('audio/claps.mp3')

const playAgain = () => {
    start.textContent = 'שחק שוב'
    heats = 0
    start.addEventListener('click',()=>{
        location.reload()
    })
}
const theGame = () => {
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

    const timefix = () => {
        const [minutes, secs] = stopwatch.textContent.replace("זמן: ", '').split(':').map(Number)
        return (minutes * 60) + secs
    }

    const moveNasralla = () => {
        moveNasrallaInterval = setInterval(() => {
            const gameRect = game.getBoundingClientRect()
            const nasrallaRect = nasralla.getBoundingClientRect()
            const randomX = Math.random() * (gameRect.width - nasrallaRect.width)
            const randomY = Math.random() * (gameRect.height - nasrallaRect.height)
            const randWidth = Math.random() * (50 - 15) + 15

            nasralla.style.left = `${randomX}px`
            nasralla.style.top = `${randomY}px`
            nasralla.style.width = `${randWidth}px`
        }, changeTime)
    }

    const checkConditions = () => {
        conditionCheckInterval = setInterval(() => {
            const theLastTime = timefix()

            if (heats >= 15 && theLastTime >= 20) {
                gameStatus.textContent = "חיסלת את נסראללה"
                claps.play()
                startStopTimer()
                clearInterval(moveNasrallaInterval)
                clearInterval(conditionCheckInterval)
                game.style.backgroundImage = "url('pic/blasted.gif')"
                game.innerHTML = `<h1>נסראללה חוסל</h1>
                `
                playAgain()

            } else if (heats < 15 && theLastTime >= 20) {
                gameStatus.textContent = "נכשלת בחיסול של נסראללה"
                clearInterval(moveNasrallaInterval)
                clearInterval(conditionCheckInterval)
                startStopTimer()
                game.innerHTML = `
                `
                playAgain()
            }
        }, 100)
    }

    start.addEventListener('click', () => {
        game.innerHTML = ''
        heats = 0
        heatsScore.textContent = `ניקוד: ${heats}`
        nasralla = document.createElement('img')
        nasralla.className = 'nas'
        nasralla.id = 'bool'
        nasralla.src = 'pic/nas.png'
        game.appendChild(nasralla)


        if (difirculty.value === "קל") changeTime = 1000
        else if (difirculty.value === "בינוני") changeTime = 800
        else if (difirculty.value === "קשה") changeTime = 650

        startStopTimer()
        audio.play()
        moveNasralla()
        checkConditions()

        nasralla.addEventListener('click', () => {
            heats++
            shotgun.play()
            heatsScore.textContent = `ניקוד: ${heats}`
        })
    })
    displayStopWatch()
}

theGame()