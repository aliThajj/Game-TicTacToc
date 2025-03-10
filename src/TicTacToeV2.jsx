import React, { useState } from "react";
import Board from "./assets/components/Board";
import Status from "./assets/components/Status";
import RestartButton from "./assets/components/RestartButton";
import { calculateWinner } from "./assets/utils/Utils";
import "./TicTacToe.css";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [AiThink, setAiThink] = useState(false);


  // const getAIMove = (board) => { // basic
  //   const emptyCells = board
  //     .map((value, index) => (value === null ? index : null))
  //     .filter((index) => index !== null);

  //   if (emptyCells.length === 0) return null; // No empty cells left
  //   const randomIndex = Math.floor(Math.random() * emptyCells.length);
  //   return emptyCells[randomIndex];
  // };

  const getAIMove = (board) => {
    // Minimax function to evaluate the best move
    const minimax = (board, depth, isMaximizing) => {
      const winner = calculateWinner(board);

      // Base cases for the recursion
      if (winner === "O") return 10 - depth; // AI wins
      if (winner === "X") return depth - 10; // Human wins
      if (board.every((cell) => cell !== null)) return 0; // Draw

      if (isMaximizing) {
        // AI's turn (maximize the score)
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
          if (board[i] === null) {
            board[i] = "O"; // AI makes a move
            const score = minimax(board, depth + 1, false); // Recursively evaluate
            board[i] = null; // Undo the move
            bestScore = Math.max(score, bestScore); // Track the best score
          }
        }
        return bestScore;
      } else {
        // Human's turn (minimize the score)
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
          if (board[i] === null) {
            board[i] = "X"; // Human makes a move
            const score = minimax(board, depth + 1, true); // Recursively evaluate
            board[i] = null; // Undo the move
            bestScore = Math.min(score, bestScore); // Track the best score
          }
        }
        return bestScore;
      }
    };

    // Find the best move for the AI
    let bestMove = null;
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = "O"; // AI makes a move
        const score = minimax(board, 0, false); // Evaluate the move
        board[i] = null; // Undo the move
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
    // console.log(bestMove)
    return bestMove; // Return the best move index
  };


  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) return; // Prevent invalid moves

    // Human move (always X)
    const newBoard = [...board];
    newBoard[index] = "X"; // Human is always X
    setBoard(newBoard);
    setAiThink(true);
    console.log(...board)


    // Check if the game is over after the human move
    const winner = calculateWinner(newBoard);
    if (winner) {
      // alert(`Winner: ${winner}`);
      return;
    }

    // AI move (always O)
    const aiMove = getAIMove(newBoard);
    if (aiMove !== null) {
      setTimeout(() => {
        const updatedBoard = [...newBoard];
        updatedBoard[aiMove] = "O"; // AI is always O
        setBoard(updatedBoard);
        setAiThink(false);

        // Check if the game is over after the AI move
        const aiWinner = calculateWinner(updatedBoard);
        if (aiWinner) {
          // alert(`Winner: ${aiWinner}`);
          console.log(winner)
        }
      }, 1000); // Add a delay to simulate AI "thinking"
    }
  };

  const winner = calculateWinner(board);
  const isDraw = board.every((square) => square !== null);

  const handleRestart = () => {
    setBoard(Array(9).fill(null));
    setAiThink(false);
  };

  return (
    <div className="container">
      <h1 className="title">Tic Tac Toe</h1>
      <Board board={board} onClick={handleClick} aiThink={AiThink} />
      <Status winner={winner} isDraw={isDraw} aiThink={AiThink} />
      <RestartButton onRestart={handleRestart} />
    </div>
  );
};

export default TicTacToe;