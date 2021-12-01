import React from "react";
import { getRandomDifficulty, capitalize } from "../utils/sudoku";
import { DIFFICULTIES } from "../constants";
import "./styles/BoardControls.css";

export default function BoardControls({
  setDifficulty,
  validate,
  solve,
  difficulty,
  solveStatus,
  reset,
}) {
  return (
    <div className="board-controls">
      <div className="board-controls__difficulty">
        {DIFFICULTIES.map((difficultyString) => {
          return (
            <button
              key={`${difficultyString}-button`}
              className={
                difficulty === difficultyString
                  ? "btn btn--min btn--active"
                  : "btn btn--min"
              }
              onClick={() => setDifficulty(difficultyString)}
            >
              {capitalize(difficultyString)}
            </button>
          );
        })}
        <button
          className={"btn btn--min"}
          onClick={() => setDifficulty(getRandomDifficulty())}
        >
          Random
        </button>
      </div>
      <div className="board-controls__status">
        <span>Status: {capitalize(solveStatus)}</span>
        <span>Difficulty: {capitalize(difficulty)}</span>
      </div>
      <div className="board-controls__validation">
        <button className="btn" onClick={() => reset()}>
          Reset
        </button>
        <button className="btn" onClick={() => validate()}>
          {solveStatus === "solved"
            ? "Puzzle is Solved :)"
            : solveStatus === "broken"
            ? "Puzzle is Broken :("
            : "Validate"}
        </button>
        <button className="btn" onClick={() => solve()}>
          Solve
        </button>
      </div>
    </div>
  );
}
