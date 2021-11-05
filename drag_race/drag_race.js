const input = document.querySelector('input')
const form = document.querySelector('form')

const startDragRace = () => {
  if (!input.checkValidity()) { return }

  else {
    form.addEventListener('submit', (event) => {
      event.preventDefault()
    })
    
    clearStopwatch()
    resetCarPosition()
    runStopwatch()
    runCar()
  }
}

let stopwatchId = undefined;

runStopwatch = () => {
  stopwatchId = setInterval(handleTime, 10)
}

const handleTime = () => {
  updateTime()
  displayTime()
}

let hours = 0;
let minutes = 0;
let seconds = 0;
let mseconds = 0;

const updateTime = () => {
  mseconds += 10

  if (mseconds === 1000) {
    mseconds = 0
    seconds += 1
  }

  if (seconds === 60) {
    seconds = 0
    minutes += 1
  }

  if (minutes === 60) {
    minutes = 0
    hours += 1
  }
}

const main_time = document.querySelector('.hour-min-sec')
const auxiliar_time = document.querySelector('.msec')

const displayTime = () => {
  const h = hours < 10 ?
    "0" + hours
    : hours
  const min = minutes < 10 ?
    "0" + minutes
    : minutes
  const sec = seconds < 10 ?
    "0" + seconds
    : seconds
  const msec = mseconds

  main_time.innerText = `${h}:${min}:${sec}`
  auxiliar_time.innerText = `${msec}`
}

const clearStopwatch = () => {
  hours = 0
  minutes = 0
  seconds = 0
  mseconds = 0
  displayTime()
}

let carId = undefined;

runCar = () => {
  carId = setInterval(updateCarPosition, 1)
}

const carImg = document.querySelector('.car');

let carPosition = 0;

const updateCarPosition = () => {

  if (carImg.style.left === '1150px') {
    carPosition = 0
  }
  else {
    carPosition += 1
  }

  carImg.style.left = `${carPosition}px`
}

const resetCarPosition = () => {
  carPosition = 0
  carImg.style.left = `${carPosition}px`
}

const stopDragRace = () => {

  if (stopwatchId === undefined || carId === undefined) { return }
  else {
    clearInterval(stopwatchId)
    stopwatchId = undefined

    clearInterval(carId)
    carId = undefined

    setPlayerToList(getPlayer())
    addPlayerToSessionStorage()
    addBestPlayerToLocalStorage()

    input.value = ''
  }
}

const getPlayer = () => {
  const playerTime = `${main_time.innerText} and ${auxiliar_time.innerText} ms`
  const player = { name: input.value, time: playerTime }
  return player
}

const list = document.querySelector('ul')

const setPlayerToList = (player) => {
  const listItem = document.createElement('li')
  list.appendChild(listItem)
  listItem.innerText = `${player.name} | ${player.time}`
}

const addPlayerToSessionStorage = () => {
  const playerKey = Math.random()
  const playerScore = hours + minutes * 60 + seconds + (mseconds / 1000)
  const playerStorage = { name: input.value, time: playerScore }
  sessionStorage.setItem(playerKey, JSON.stringify(playerStorage))
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

startButton.addEventListener('click', () => startDragRace())

const stopButton = document.querySelector('button[name="stop"]')

stopButton.addEventListener('click', () => stopDragRace())
