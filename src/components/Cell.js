import React from "react";

export default function Cell({
  column,
  row,
  value,
  disabled,
  setProgress,
  progress,
}) {
  return (
    <input
      disabled={disabled}
      className={`cell col${column} row${row}`}
      type="text"
      value={value}
      onChange={(e) => {
        let newValue = e.target.value.replace(/[^1-9]/gim, 0);
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
