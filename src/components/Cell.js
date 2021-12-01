import React from "react";
import "./styles/Cell.css";

function getSquare(row, column) {
  if (row < 3) {
    if (column < 3) {
      return 0;
    }
    if (column > 5) {
      return 2;
    }
    return 1;
  } else if (row > 5) {
    if (column < 3) {
      return 6;
    }
    if (column > 5) {
      return 8;
    }
    return 7;
  } else {
    if (column < 3) {
      return 3;
    }
    if (column > 5) {
      return 5;
    }
    return 4;
  }
}

export default function Cell({
  column,
  row,
  value,
  disabled,
  setProgress,
  solveStatus,
  progress,
}) {
  return (
    <input
      data-solve={solveStatus}
      disabled={disabled}
      className={`cell col${column} row${row} sq${getSquare(row, column)}`}
      type="text"
      value={value}
      inputMode="numeric"
      pattern="[0-9]*"
      onChange={(e) => {
        let newValue = e.target.value.replace(/[^1-9]/gim, 0);
        console.log(newValue);
        if ((newValue >= 1 && newValue <= 9) || newValue === "") {
          if (newValue === "") {
            newValue = 0;
          }
          const newProgress = [...progress];
          newProgress[row][column] = parseInt(newValue);
          setProgress(newProgress);
        }
      }}
    />
  );
}
