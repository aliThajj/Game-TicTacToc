import React, { useState } from "react"; // Import useState
import classNames from "classnames"; // for avoid white space in class
import "./board.css";

function Board({ board, onClick, aiThink, winningLine, playerSymbol }) {
  const [flippedCells, setFlippedCells] = useState([]); // Track flipped cells

  const style = {
    "--before-content": `"${playerSymbol}"`,
  };

  const handleClick = (index) => {
    // Add the flip animation class to the clicked cell
    setFlippedCells((prev) => [...prev, index]);

    // Call the original onClick handler
    onClick(index);

    // Remove the flip animation class after the animation completes
    setTimeout(() => {
      setFlippedCells((prev) => prev.filter((i) => i !== index));
    }, 600); // Match the duration of the flip animation
  };

  return (
    <div className="board relative w-full">
      {board.map((value, index) => (
        <button
          key={index}
          style={style}
          className={classNames("cell relative", {
            "bg-teal-500 text-white": winningLine?.includes(index) && value === "X", // Customise Cells of X win
            "bg-yellow-300 text-white": winningLine?.includes(index) && value === "O", // Customise Cells of O win
            "no-empty": value,
            "text-teal-500": !winningLine?.includes(index) && value === "X", // Change color of Cell On clicking X
            "text-yellow-400": !winningLine?.includes(index) && value === "O", // Change color of Cell On clicking O
            "flip-animation": flippedCells.includes(index), // Add flip animation class
          })}
          onClick={() => handleClick(index)}
          disabled={aiThink || winningLine || value}>
          {value}
        </button>
      ))}
    </div>
  );
}

export default Board;