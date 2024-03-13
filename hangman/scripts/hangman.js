// 1. Conver "statusMessage" to a custom getter for "statuMessage"
// 2. conver "getPuzzle" to a custom getter for "puzzle"
// 3. change usage in app.js

class Hangman {
    constructor(word, attempt) {
    this.word = word.toLowerCase().split('')
    this.guessLetters = []
    this.remainingGuesses = attempt
    this.status = 'playing'
    }

    getStatus() {
        let gameStatus = this.word.every((letters) => this.guessLetters.includes(letters) || letters === ' ')

        if (this.remainingGuesses <= 0) {
            this.status = 'failed'
        } else if (gameStatus) {
            this.status = 'finished'
        } else {
            this.status = 'playing'
        }
    }

    get statusMessage() {
        if (this.status === 'playing') {
            return `Guesses left: ${this.remainingGuesses}`
        } else if (this.status === 'failed') {
            return `Nice try! The word was "${this.word.join('')}"`
        } else {
            return 'Great work! You guessed the word.'
        }
    }

    get puzzle() {
        let puzzle = ''
        this.word.forEach((letter) => {
        if (this.guessLetters.includes(letter) || letter === ' ') {
            puzzle += letter
        } else {
            puzzle += '*'
        }
        })
        return puzzle
    }

    makeAGuess(guess) {
        guess = guess.toLowerCase()
        const uniqueGuess = !this.guessLetters.includes(guess)
        const badGuess = !this.word.includes(guess)


        if (this.remainingGuesses <= 0) {
            return
        }
        if (uniqueGuess) {
            this.guessLetters.push(guess)
        }

        if (uniqueGuess && badGuess) {
            this.remainingGuesses--
        }
    }


}
