import React, { useState } from "react";
import Board from "./assets/components/Board";
import Status from "./assets/components/Status";
import RestartButton from "./assets/components/RestartButton";
import { calculateWinner } from "./assets/utils/Utils";
import "./TicTacToe.css";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [aiThinking, setAiThinking] = useState(false);
  const [winnerInfo, setWinnerInfo] = useState(null); // Store winner and winning line

  const getAIMove = (board) => {
    const minimax = (board, depth, isMaximizing, alpha, beta) => {
      const result = calculateWinner(board);

      if (result?.winner === "O") return 10 - depth;
      if (result?.winner === "X") return depth - 10;
      if (board.every((cell) => cell !== null)) return 0;

      if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
          if (board[i] === null) {
            const newBoard = [...board];
            newBoard[i] = "O";
            const score = minimax(newBoard, depth + 1, false, alpha, beta);
            bestScore = Math.max(score, bestScore);
            alpha = Math.max(alpha, bestScore);
            if (beta <= alpha) break;
          }
        }
        return bestScore;
      } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
          if (board[i] === null) {
            const newBoard = [...board];
            newBoard[i] = "X";
            const score = minimax(newBoard, depth + 1, true, alpha, beta);
            bestScore = Math.min(score, bestScore);
            beta = Math.min(beta, bestScore);
            if (beta <= alpha) break;
          }
        }
        return bestScore;
      }
    };

    let bestMove = null;
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        const newBoard = [...board];
        newBoard[i] = "O";
        const score = minimax(newBoard, 0, false, -Infinity, Infinity);
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
    return bestMove;
  };

  const handleClick = (index) => {
    if (board[index] || winnerInfo) return; // Prevent moves if the game is over

    // Human move (always X)
    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);
    setAiThinking(true);

    const result = calculateWinner(newBoard);
    if (result) {
      setWinnerInfo(result); // Set winner and winning line
      return;
    }

    // AI move (always O)
    const aiMove = getAIMove(newBoard);
    if (aiMove !== null) {
      setTimeout(() => {
        const updatedBoard = [...newBoard];
        updatedBoard[aiMove] = "O";
        setBoard(updatedBoard);
        setAiThinking(false);

        const aiResult = calculateWinner(updatedBoard);
        if (aiResult) {
          setWinnerInfo(aiResult); // Set winner and winning line
        }
      }, 1000); // Simulate AI "thinking"
    }
  };

  const isDraw = board.every((square) => square !== null);

  const handleRestart = () => {
    setBoard(Array(9).fill(null));
    setAiThinking(false);
    setWinnerInfo(null); // Reset winner info
  };

  return (
    <div className="container">
      <h1 className="title">Tic Tac Toe</h1>
      <Board
        board={board}
        onClick={handleClick}
        aiThink={aiThinking}
        winningLine={winnerInfo?.winningLine} // Pass winning line to Board
      />
      <Status
        winner={winnerInfo?.winner}
        isDraw={isDraw}
        aiThink={aiThinking}
      />
      <RestartButton onRestart={handleRestart} />
    </div>
  );
};

export default TicTacToe;