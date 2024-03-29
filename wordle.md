### Design Wordle

Game

- solution: string
- dictionary : string[]

- guessHistory: [[char, color]][]

- submitGuess

  - verify length is 5
  - valid word

  - check characters

    - in solution
    - in correct position

  - check winner / run out of attempts

- requests / responses

  - POST /guess

    - body: {guess: string}
    - response: {guess: [[char, color]], gameStatus: "won"|"lost"|"inProgress", isValid:boolean }

  - GET /game
    - body: { gameID: string }
    - response: { gameStatus: "won"|"lost"|"inProgress" }

Test Strategy
Game

- empty -> render
- lost
- won

Guess (word)

- empty
- invalid word (length != 5, not in dictionary)
- valid word : happy path
- solution
- non-solutin
- non-alphanumerical characters
