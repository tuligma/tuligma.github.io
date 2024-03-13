// HTTP (Hypertext Transfer Protocol)
// Request - What do we want to do
// Response - What was actually done

const puzzleEl = document.querySelector('#puzzle')
const attemptEl = document.querySelector('#attempt')
const letterEl = document.createElement('span')
const statusMessageEl = document.createElement('p')
letterEl.id = 'letter'
statusMessageEl.id = 'statusMessage'
let game1


// puzzleEl.textContent = `Puzzle: ${game1.puzzle}`
// attemptEl.textContent = game1.statusMessage
document.querySelector('#container').appendChild(letterEl)
document.body.appendChild(statusMessageEl)


// Guess Keyboard press
window.addEventListener('keypress', (e) => {
    if (game1.status === 'playing') {
        const guess = String(e.key)
        game1.makeAGuess(guess)
        game1.getStatus()
        render()

        letterEl.textContent = guess

        setTimeout(() => {
            letterEl.textContent = ''    
        }, 500)
        
    } else {
        letterEl.textContent = ''
    }
})


const render = () => {
    puzzleEl.innerHTML = ''
    attemptEl.textContent = '🔍' + game1.statusMessage
    letterEl.textContent = ''

    const puzzleArray = game1.puzzle.split('')
    puzzleArray.forEach((letter) => {
        const puzzleLetter = document.createElement('span')
        document.querySelector('#puzzle').appendChild(puzzleLetter)
        puzzleLetter.textContent = letter
    })
}

const startGame = async () => {
    const puzzle = await getPuzzle('2')
    const attemptNumber = Math.floor(puzzle.length / 3)
    game1 = new Hangman(puzzle, attemptNumber)
    console.log(puzzle)
    render()
}

document.querySelector('#reset').addEventListener('click', startGame)

startGame()

// getPuzzle('3').then((puzzle) => {
//     console.log(`Puzzle word: ${puzzle}`)
// }).catch((err) => {
//     console.log(err)
// })


// getCurrentCountry().then((country) => {
//     console.log(country.name.common)
// }).catch((error) => {
//     console.log(error)
// })