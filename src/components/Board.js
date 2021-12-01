import React from "react";
import PropTypes from "prop-types";

import Cell from "./Cell";

export default function Board({ puzzle, progress, setProgress }) {
  function buildBoard() {
    const cells = [];
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const cellValue =
          puzzle[r][c] !== 0
            ? puzzle[r][c]
            : progress[r][c] !== 0
            ? progress[r][c]
            : "";
        cells.push(
          <Cell
            row={r}
            column={c}
            value={cellValue}
            key={`cell-${r}${c}`}
            disabled={puzzle[r][c] !== 0}
            setProgress={setProgress}
            progress={progress}
          />
        );
      }
    }

    return cells;
  }

  return (
    <div className="board">
      {!puzzle || !progress ? (
        <span className="loading-text">Loading...</span>
      ) : (
        buildBoard()
      )}
    </div>
  );
}

Board.propTypes = {
  puzzle: PropTypes.array,
  progress: PropTypes.array,
  updateProgress: PropTypes.func,
};
