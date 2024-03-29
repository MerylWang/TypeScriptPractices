// class Person {
//     // Properties
//     name: string;
//     age: number;

//     // Constructor
//     constructor(name: string, age: number) {
//       this.name = name;
//       this.age = age;
//     }

//     // Method
//     greet() {
//       console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
//     }
//   }

class Wordle {
  solution: string;
  guesses: string[][];
  maxAttempts: number = 6;

  constructor(solution: string) {
    this.solution = solution;
    this.guesses = [];
  }

  /**
       * 
       *   - verify length is 5
          - valid word
  
          - check characters
  
              - in solution
              - in correct position
  
          - check winner / run out of attempts
  
          {guess: [[char, color]], gameStatus: "won"|"lost"|"inProgress", isValid:boolean }
       */
  submitGuess(guess: string) {
    if (guess.length !== 5) {
      throw new Error('Invalid guess - must be 5 characters');
    }

    // assuming guess is converted to lowercase
    if (!/^[a-z]*$/.test(guess)) {
      throw new Error('Invalid guess - must be a valid word');
    }

    if (this.guesses.length >= this.maxAttempts) {
      throw new Error('Game over');
    }

    if (guess === this.solution) {
      // todo: winner

      return {};
    }

    if (this.guesses.length === this.maxAttempts - 1) {
      // todo: lost

      return {};
    }

    // general case - check characters
    // guess: bbaaa
    // solution: aaaab
    const solutionFreqMap: Record<string, number> = {};
    for (let i = 0; i < this.solution.length; i++) {
      const char = this.solution[i];
      if (!solutionFreqMap[char]) {
        solutionFreqMap[char] = 1;
      } else {
        solutionFreqMap[char]++;
      }
    }

    for (let i = 0; i < guess.length; i++) {
      const char = guess[i];
      // green
      if (char === this.solution[i]) {
        solutionFreqMap[char]--;
      }

      // yellow

      // gray
    }

    // todo: add guess to guesses
  }
}

export default Wordle;
