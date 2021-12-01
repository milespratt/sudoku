import { useState, useEffect, useRef } from "react";
import "./styles/App.css";
import Board from "./Board";
import BoardControls from "./BoardControls";
import { solvePuzzle } from "../utils/sudoku";

function App() {
  const [puzzle, setPuzzle] = useState(null);
  const [progress, setProgress] = useState(null);
  const solvedPuzzle = useRef(null);
  const [solveStatus, setSolveStatus] = useState("unsolved");
  const difficulty = useRef("easy");

  // if there is no puzzle get a new one
  useEffect(() => {
    if (!puzzle) {
      fetch(
        `https://vast-chamber-17969.herokuapp.com/generate?difficulty=${difficulty}`
      )
        .then((response) => response.json())
        .then((data) => {
          let rowStart = "A";
          const arrayPuzzle = [[], [], [], [], [], [], [], [], []];
          for (let r = 0; r < 9; r++) {
            for (let c = 1; c < 10; c++) {
              const cellID = `${rowStart}${c}`;
              const value = parseInt(data.puzzle[cellID]) || 0;
              arrayPuzzle[r].push(value);
            }
            rowStart = String.fromCharCode(rowStart.charCodeAt(0) + 1);
          }

          setPuzzle(arrayPuzzle);

          // use JSON parse to create a deep copy of the array to prevent unwanted state updates
          setProgress(JSON.parse(JSON.stringify(arrayPuzzle)));
          // save a solved version of the puzzle for validation
          solvedPuzzle.current = solvePuzzle(
            JSON.parse(JSON.stringify(arrayPuzzle))
          );
        });
    }
  }, [puzzle]);

  function isValid(a, b) {
    const progressString = JSON.stringify(a);
    const solvedString = JSON.stringify(b);
    const solved = progressString === solvedString;
    return solved;
  }

  function updateProgress(newProgress) {
    if (
      solveStatus !== "unsolved" &&
      !isValid(newProgress, solvedPuzzle.current)
    ) {
      setSolveStatus("unsolved");
    } else if (isValid(newProgress, solvedPuzzle.current)) {
      setSolveStatus("solved");
    }
    setProgress(newProgress);
  }

  function validate() {
    const progressString = JSON.stringify(progress);
    const solvedString = JSON.stringify(solvedPuzzle.current);
    const solved = progressString === solvedString;
    setSolveStatus(solved ? "solved" : "broken");
  }

  function reset() {
    setProgress(JSON.parse(JSON.stringify(puzzle)));
    setSolveStatus("unsolved");
  }

  function solve() {
    setProgress(JSON.parse(JSON.stringify(solvedPuzzle.current)));
    setSolveStatus("solved");
  }

  function setDifficulty(value) {
    difficulty.current = value;
    setSolveStatus("unsolved");
    setPuzzle(null);
  }

  return (
    <div className="App">
      <h1>Sudoku</h1>
      <Board
        solveStatus={solveStatus}
        puzzle={puzzle}
        setProgress={updateProgress}
        progress={progress}
      />
      <BoardControls
        setDifficulty={setDifficulty}
        solve={solve}
        validate={validate}
        difficulty={difficulty.current}
        solveStatus={solveStatus}
        reset={reset}
      />
    </div>
  );
}

export default App;
