import React from "react";

function Board({ board, onClick, aiThink, winningLine }) {
  return (
    <div className="board">
      {board.map((value, index) => (
        <button
          key={index}
          className={`cell ${winningLine?.includes(index) ? "winning-cell" : ""}`}
          onClick={() => onClick(index)}
          disabled={aiThink}>
          {value}
        </button>
      ))}
    </div>
  );
}

export default Board;


// import React from "react";
// // import "./TicTacToe.css";

// const Board = ({ board, onClick, aiThink, winningCombination }) => {
//   // Function to calculate the line's position and orientation
//   const getLineStyle = (winningCombination) => {
//     if (!winningCombination) return { display: "none" }; // No line if no winner

//     // Get the first and last cell of the winning combination
//     const firstCell = winningCombination[0];
//     const lastCell = winningCombination[winningCombination.length - 1];

//     // Calculate the line's orientation and position
//     if (winningCombination.includes(0) && winningCombination.includes(2)) {
//       // Top row (horizontal)
//       return {
//         width: "100%",
//         height: "4px",
//         top: "16.5%",
//         left: "0",
//         transform: "none",
//       };
//     } else if (winningCombination.includes(3) && winningCombination.includes(5)) {
//       // Middle row (horizontal)
//       return {
//         width: "100%",
//         height: "4px",
//         top: "50%",
//         left: "0",
//         transform: "translateY(-50%)",
//       };
//     } else if (winningCombination.includes(6) && winningCombination.includes(8)) {
//       // Bottom row (horizontal)
//       return {
//         width: "100%",
//         height: "4px",
//         top: "83.5%",
//         left: "0",
//         transform: "none",
//       };
//     } else if (winningCombination.includes(0) && winningCombination.includes(6)) {
//       // Left column (vertical)
//       return {
//         width: "4px",
//         height: "100%",
//         top: "0",
//         left: "16.5%",
//         transform: "none",
//       };
//     } else if (winningCombination.includes(1) && winningCombination.includes(7)) {
//       // Middle column (vertical)
//       return {
//         width: "4px",
//         height: "100%",
//         top: "0",
//         left: "50%",
//         transform: "translateX(-50%)",
//       };
//     } else if (winningCombination.includes(2) && winningCombination.includes(8)) {
//       // Right column (vertical)
//       return {
//         width: "4px",
//         height: "100%",
//         top: "0",
//         left: "83.5%",
//         transform: "none",
//       };
//     } else if (winningCombination.includes(0) && winningCombination.includes(8)) {
//       // Diagonal (top-left to bottom-right)
//       return {
//         width: "140%",
//         height: "4px",
//         top: "50%",
//         left: "50%",
//         transform: "translate(-50%, -50%) rotate(45deg)",
//       };
//     } else if (winningCombination.includes(2) && winningCombination.includes(6)) {
//       // Diagonal (top-right to bottom-left)
//       return {
//         width: "140%",
//         height: "4px",
//         top: "50%",
//         left: "50%",
//         transform: "translate(-50%, -50%) rotate(-45deg)",
//       };
//     }
//     return { display: "none" }; // Default: no line
//   };

//   return (
//     <div className="board">
//       {board.map((value, index) => (
//         <button
//           key={index}
//           className={`cell ${winningCombination && winningCombination.includes(index) ? "winning-cell" : ""
//             }`}
//           onClick={() => onClick(index)}
//           disabled={aiThink}
//         >
//           {value}
//         </button>
//       ))}
//       {/* Line to highlight the winning combination */}
//       <div className="winning-line" style={getLineStyle(winningCombination)} />
//     </div>
//   );
// };

// export default Board;