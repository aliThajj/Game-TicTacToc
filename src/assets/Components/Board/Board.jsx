import classNames from "classnames"; // for avoid white space in class 
import './board.css'

function Board({ board, onClick, aiThink, winningLine, playerSymbol }) {

  const style = {
    '--before-content': `"${playerSymbol}"`,
    // '--after-content': `"${afterContent}"`,
  };

  return (
    <div className="board relative w-full">

      {board.map((value, index) => (
        <button
          key={index}
          style={style}
          className={classNames("cell relative", {
            // "winning-cell": winningLine?.includes(index),
            " bg-teal-500 text-white": winningLine?.includes(index) && value === "X", // Customise Cells of X win
            " bg-yellow-300 text-white": winningLine?.includes(index) && value === "O", // Customise Cells of O win
            "no-empty": value,
            "text-teal-500": !winningLine?.includes(index) && value === 'X', // Change color of Cell On clicking X
            'text-yellow-400': !winningLine?.includes(index) && value === 'O' // Change color of Cell On clicking O
          })}
          onClick={() => onClick(index)}
          disabled={aiThink || winningLine}>
          {value}
        </button>
      ))
      }
    </div >
  );
}

export default Board;
