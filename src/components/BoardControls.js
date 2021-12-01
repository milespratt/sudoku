import React from "react";
import { getRandomDifficulty, capitalize } from "../utils/sudoku";
import { DIFFICULTIES } from "../constants";

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
        <span>Generate:</span>
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
        <button className="btn" onClick={() => reset()}>
          Reset
        </button>
      </div>
      <div className="board-controls__validation">
        <span>Status: {capitalize(solveStatus)}</span>
        <span>Difficulty: {capitalize(difficulty)}</span>
      </div>
      <button className="btn" onClick={() => validate()}>
        Validate
      </button>
      <button className="btn" onClick={() => solve()}>
        Solve
      </button>
    </div>
  );
}
