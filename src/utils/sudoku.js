import { DIFFICULTIES } from "../constants";

export function getRandomDifficulty() {
  const difficulties = ["easy", "medium", "hard"];
  const random = Math.floor(Math.random() * 3);
  const randomDifficulty = difficulties[random];
  return randomDifficulty;
}

export function capitalize(string) {
  return `${string.toLowerCase().charAt(0).toUpperCase()}${string.substring(
    1
  )}`;
}

// get the next empty cell for testing
function getNextPuzzleCell(puzzle) {
  // loop over rows
  for (let r = 0; r < 9; r++) {
    // loop over columns
    for (let c = 0; c < 9; c++) {
      // if the cell is 0 return it
      if (puzzle[r][c] === 0) return [r, c];
    }
  }
  // if there are no empty cells return -1
  return [-1, -1];
}

// validate row
function validateRow(puzzle, row, value) {
  // loop over each entry in the row (columns)
  for (let c = 0; c < puzzle[row].length; c++) {
    // if the value already exists in the row return false
    if (puzzle[row][c] === value) {
      return false;
    }
  }
  // returning true means the row is valid
  return true;
}

// validate column
function validateColumn(puzzle, column, value) {
  // loop over each entry in the column (rows)
  for (let r = 0; r < puzzle.length; r++) {
    // if the value already exists in the column return false
    if (puzzle[r][column] === value) {
      return false;
    }
  }
  // returning true means the column is valid
  return true;
}

// validate square
function validateSquare(puzzle, row, column, value) {
  // squares are 3x3. Use the row and column to get the square coordinates
  const squareRow = Math.floor(row / 3) * 3;
  const squareColumn = Math.floor(column / 3) * 3;

  // loop over each square row
  for (let r = 0; r < 3; r++) {
    // loop over each square column
    for (let c = 0; c < 3; c++) {
      // if the value already exists in the square return false
      if (puzzle[squareRow + r][squareColumn + c] === value) return false;
    }
  }
  // returning true means the square is valid
  return true;
}

// validate row, column, and square
function validateAll(puzzle, row, column, value) {
  // if all are valid return true
  if (
    validateRow(puzzle, row, value) &&
    validateColumn(puzzle, column, value) &&
    validateSquare(puzzle, row, column, value)
  ) {
    return true;
  }
  // return false if any are invalid
  return false;
}

// recursive backtracking algorithm to solve given puzzle
export function solvePuzzle(puzzle) {
  // get the next puzzle cell for testing
  const [row, column] = getNextPuzzleCell(puzzle);

  // return the puzzle if there are no empty cells left
  if (row === -1) {
    return puzzle;
  }

  // loop through possible values
  for (let num = 1; num <= 9; num++) {
    // if the cell is valid set the value and call solvePuzzle again to solve next cell
    if (validateAll(puzzle, row, column, num)) {
      puzzle[row][column] = num;
      solvePuzzle(puzzle);
    }
  }

  // if there are no valid numbers set this cell back to 0
  if (getNextPuzzleCell(puzzle)[0] !== -1) {
    puzzle[row][column] = 0;
  }

  return puzzle;
}
