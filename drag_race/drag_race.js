let timeId = undefined;

const input = document.querySelector('input')
const form = document.querySelector('form')
const stopwatch = document.querySelector('.stopwatch')

const _STOPWATCH_OPEN_CLASS = "--start-stopwatch"

const runStopwatch = () => {
  if (!input.checkValidity()) {
    return
  }

  else {
    form.addEventListener('submit', (event) => {
      event.preventDefault()
    })

    stopwatch.classList.add(_STOPWATCH_OPEN_CLASS)

    if (timeId === undefined) {
      timeId = setInterval(updateTime, 1000)
    }
  }
}

let minutes = 0;
let seconds = 0;

const time = document.querySelector('span[name="time"]')

const updateTime = () => {
  seconds += 1

  if (seconds === 60) {
    minutes += 1
    seconds = 0
  }

  displayTime(time)
}

const displayTime = (element) => {
  const min = minutes < 10 ? "0" + minutes : minutes
  const sec = seconds < 10 ? "0" + seconds : seconds
  element.innerText = `${min}:${sec}`
}

const list = document.querySelector('ul')

const stopStopwatch = () => {

  let stopwatchClassListArray = [...stopwatch.classList]

  if (!stopwatchClassListArray.includes('--start-stopwatch')) {
    return
  }

  else {
    stopwatch.classList.remove(_STOPWATCH_OPEN_CLASS)

    clearInterval(timeId)
    timeId = undefined

    createListItem(setPlayerData())
    addPlayerToSessionStorage(setPlayerData())
    addBestPlayerToLocalStorage()

    input.value = ''
    minutes = 0
    seconds = 0
    displayTime(time)
  }
}

const createListItem = (playerData) => {
  const listItem = document.createElement('li')
  list.appendChild(listItem)

  listItem.innerText = `${playerData.name} | ${playerData.time} seconds`
}

const setPlayerData = () => {
  const playerName = input.value
  const playerTimeInSeconds = minutes * 60 + seconds
  const playerData = { name: playerName, time: playerTimeInSeconds }
  return playerData
}

let playerKey = 0;

const addPlayerToSessionStorage = (playerData) => {
  playerKey += 1
  sessionStorage.setItem(playerKey, JSON.stringify(playerData))
}

const addBestPlayerToLocalStorage = () => {
  const players = Object.values(sessionStorage)
    .map(player => JSON.parse(player))

  const playersTime = players
    .map(player => player.time)

  const minTime = Math.min(...playersTime)

  const bestPlayer = players
    .filter(player => player.time === minTime)

  localStorage.setItem("best player", JSON.stringify(bestPlayer))
}

const startButton = document.querySelector('button[name="start"]')

startButton.addEventListener('click', runStopwatch)

const stopButton = document.querySelector('button[name="stop"]')

stopButton.addEventListener('click', stopStopwatch)
